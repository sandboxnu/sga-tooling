import React, { createContext, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Homepage from "./Homepage";

export type User = number | null;

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <main className="flex min-h-screen flex-col justify-start">
        <Menu />
        <Homepage />
        <Footer />
      </main>
    </LoginContext.Provider>
  );
}

export default App;
