import { ReactElement, useContext } from "react";
import { LoginContext } from "../App";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = (): ReactElement => {    
    const {user} = useContext(LoginContext);
    return user ? <Outlet /> : <Navigate to="/" />; //yuh 
}

export default RequireAuth; 