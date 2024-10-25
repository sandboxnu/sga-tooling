import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { JWTAuthToken } from "../util/Types";

// Navigation to the login menu if the user is not logged in.

const RequireAuth = () => {
  const { member, setMember } = useContext(AuthContext);
  const [cookies] = useCookies(["token"]);

  if (!member) {
    if (cookies.token) {
      let decodedToken = jwtDecode<JWTAuthToken>(cookies.token);
      setMember(decodedToken.data);
      return <Outlet />;
    }
  }
  if (!member?.id) {
    console.log("User ID does not exist. Redirecting.");
  }
  return member?.id ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
