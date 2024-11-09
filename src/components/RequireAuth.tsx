import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import Loading from "./Loading";

// Navigation to the login menu if the user is not logged in.

const RequireAuth = () => {
  const { member, loading, checkedCookie } = useContext(AuthContext);

  if (member && checkedCookie) {
    return <Outlet />;
  } else if (loading || !checkedCookie) {
    return <Loading />;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAuth;
