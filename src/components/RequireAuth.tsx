import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../App";

// Navigation to the login menu if the user is not logged in. 

const RequireAuth = () => {
    const { userID } = useContext(LoginContext);
    if (!userID) {
        console.log("User ID does not exist. Redirecting.");
    }
    return userID ? <Outlet /> : <Navigate to="/" />;
}

export default RequireAuth; 