import { useContext } from "react";
import { LoginContext } from "../App";

export const useAuth = () => {
  return useContext(LoginContext);
};
