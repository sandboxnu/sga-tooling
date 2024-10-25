import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthClient from "../client/AuthClient";
import { Member } from "../util/Types";

type AuthContextType = {
  member?: Member;
  setMember: (member?: Member) => void;
};

export const AuthContext = createContext<AuthContextType>({
  member: undefined,
  setMember: () => {},
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
    if (
      data?.jwt === undefined ||
      data?.member === undefined ||
      error ||
      status !== 200
    ) {
      return error === undefined ? "Unknown error" : error;
    } else {
      setMember(member);
      setCookie("token", data.jwt);
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
