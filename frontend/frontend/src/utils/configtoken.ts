import store from "../store/store";

const CONFIG_TOKEN = {
    headers: {
       'Content-Type': "multipart/form-data",
       'Authorization': "Bearer " + store.getState().auth.token
    }
}

export default CONFIG_TOKEN;