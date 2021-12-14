import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../store/store';
import authSlice from '../store/slices';
import FETCH_URL from './fetchurl';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use(async (config) => {
    const { token } = store.getState().auth;

    if (token !== null) {
        config.headers!.Authorization = 'Bearer ' + token;
        // @ts-ignore
    }
    return config;
});

axiosService.interceptors.response.use(
    (res) => {
        // @ts-ignore
        return Promise.resolve(res);
    },
    (err) => {
        return Promise.reject(err);
    }
);

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
    const { refreshToken } = store.getState().auth;
    if (refreshToken !== null) {
        const formData: FormData = new FormData();
        formData.append("refresh",refreshToken);
        return axios
            .post(FETCH_URL + "refresh/",formData)
            .then((resp) => {
                debugger;
                const { access } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                store.dispatch(
                    authSlice.actions.saveUserData({ token: access, refreshToken: store.getState().auth.refreshToken!, profile: store.getState().auth.profile!, staff: store.getState().auth.staff! })
                );
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(authSlice.actions.logout());
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher<T = any>(url: string) {
    return axiosService.get<T>(url).then((res) => res.data);
}

export default axiosService;
