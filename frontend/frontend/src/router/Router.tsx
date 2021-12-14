import { BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import ActivateAccount from "../components/ActivateAccount/ActivateAccount";

import Login from '../components/Login/Login'
import Logout from "../components/Login/Logout";
import Profile from "../components/Profile/Profile";
import RegisterComponent from "../components/Register/Register";
import RegisterAuth from "../components/RegisterAuth/RegisterAuth";
import SearchResults from "../components/SearchTasks/SearchResults";
import MyTasks from "../components/Tasks/MyTasks";
import TeamTasks from "../components/Tasks/TeamTasks";
import store from "../store/store";
import IsStaffRoute from "./IsStaffRoute";
import LoggedInRoute from "./LoggedInRoute";


function Routing(){

    return (
        <Router>     
            <Routes>
                <Route path="/profile" element={<LoggedInRoute redirectOnFailure="/login" />}>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Route> 

                {!store.getState().auth.token && <Route path="/login" element={<Login/>}></Route>}

                {!store.getState().auth.token && <Route path="/register" element={<RegisterComponent/>}></Route>}

                {!store.getState().auth.token && <Route path="/activateaccount" element={<ActivateAccount/>}></Route>}

                {!store.getState().auth.token && <Route path="/register/authorization" element={<RegisterAuth/>}></Route>}

                <Route path="/mytasks" element={<LoggedInRoute redirectOnFailure="/login" />}>
                    {!store.getState().auth.staff && <Route path="/mytasks" element={<MyTasks/>}></Route>}
                </Route> 

                <Route path="/logout" element={<LoggedInRoute redirectOnFailure="/login" />}>
                    <Route path="/logout" element={<Logout/>}></Route>
                </Route> 
                
                <Route path="/teamtasks" element={<IsStaffRoute redirectOnFailure="/login" />}>
                    <Route path="/teamtasks" element={<TeamTasks/>}></Route>
                </Route> 

                <Route path="/searchresults" element={<IsStaffRoute redirectOnFailure="/login" />}>
                    <Route path="/searchresults" element={<SearchResults/>}></Route>
                </Route> 
            </Routes>
        </Router>
    );

}

export default Routing;