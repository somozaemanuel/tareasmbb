import axios from "axios"
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../store/actions";
import store from "../store/store";
import { ReducerAction } from "../types/types";

const navigate = useNavigate();

const refreshToken = async () => {
    let formData: FormData = new FormData();
    formData.append("refresh", store.getState().auth.refreshToken!)
    let url: string = "http://localhost:8000/refresh/"
    const res: any = await axios.post(url,formData)
    .catch((err) => {
        navigate("/login");
    });
    let userData: ReducerAction = saveUserData(res.data.access, store.getState().auth.refreshToken!, store.getState().auth.profile!, store.getState().auth.staff!);
    store.dispatch(userData);
}