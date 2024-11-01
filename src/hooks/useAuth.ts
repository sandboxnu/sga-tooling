import { jwtDecode } from "jwt-decode";
import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthClient from "../client/AuthClient";
import MemberClient from "../client/MemberClient";
import { JWTAuthToken, Member } from "../util/Types";

type AuthContextType = {
  member?: Member;
  loading: boolean;
  setMember: (member?: Member) => void;
  setLoading: (loading: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  member: undefined,
  loading: false,
  setMember: () => {},
  setLoading: () => {},
});

export const useAuth = (): {
  member?: Member;
  login: (nuid: string, lastName: string) => Promise<string | undefined>;
  logout: () => void;
} => {
  const [_, setCookie, removeCookie] = useCookies();
  const { member, setMember } = useContext(AuthContext);

  const login = async (nuid: string, lastName: string) => {
    const { data, error, status } = await AuthClient.login(nuid, lastName);
    if (data?.jwt === undefined || error || status !== 200) {
      return error === undefined ? "Unknown error logging in" : error;
    } else {
      setCookie("token", data.jwt);
    }
    const decodedToken = jwtDecode<JWTAuthToken>(data.jwt);
    const member = await MemberClient.fetchMember(decodedToken.data);
    if (member.data) {
      setMember(member.data);
    } else {
      return error === undefined ? "Unknown error getting member" : error;
    }
    return undefined;
  };

  const logout = () => {
    setMember(undefined);
    removeCookie("token");
  };

  return {
    member,
    login,
    logout,
  };
};
