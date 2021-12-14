import { FC } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SearchResults from "../components/SearchTasks/SearchResults";
import store from "../store/store";
import { Permissions } from "../types/types";

const LoggedInRoute: FC<Permissions> = (props) => {

    return <>
        {store.getState().auth.token ? <Outlet />: <Navigate to={props.redirectOnFailure} />}
    </>
}

export default LoggedInRoute;