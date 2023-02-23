import { ReactElement, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../App";

// Navigation to the login menu if the user is not logged in. 

const RequireAuth = (): ReactElement => {
    const { user } = useContext(LoginContext);
    return user ? <Outlet /> : <Navigate to="/" />; //yuh 
}

export default RequireAuth; 