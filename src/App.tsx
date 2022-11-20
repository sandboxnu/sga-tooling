import React, { createContext, useState } from "react";
import "./App.css";
import Error404 from "./components/Error404";
import Footer from "./components/Footer";


export type User = number | null;

type UserContext = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {/* pages to be updated once routing is provided */}
      {/* <LoginContext.Provider value={{user, setUser}}>
        <LoginPage />
        <Footer />
        <Menu/>
      </LoginContext.Provider> */}

      <Error404 />
      <Footer />
    </>
  );
}

export default App;
