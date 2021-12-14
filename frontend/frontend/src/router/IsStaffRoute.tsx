import { FC } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import store from "../store/store";
import { Permissions } from "../types/types";

const IsStaffRoute: FC<Permissions> = (props) => {

    return <>
        {store.getState().auth.staff ? <Outlet />: <Navigate to={props.redirectOnFailure} />}
    </>
}

export default IsStaffRoute;