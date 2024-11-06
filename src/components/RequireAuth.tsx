import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import Loading from "./Loading";

// Navigation to the login menu if the user is not logged in.

const RequireAuth = () => {
  const { member, loading } = useContext(AuthContext);

  if (member) {
    return <Outlet />;
  } else if (loading) {
    return <Loading />;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAuth;
