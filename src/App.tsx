import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "reflect-metadata";
import "./App.css";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Error404 from "./pages/Error404";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";

export type User = string | null;

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const nuid = localStorage.getItem("user");
    if (nuid) {
      setUser(nuid);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      <div className="flex min-h-screen flex-col justify-between">
        {user ? <Menu /> : null}
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
              errorElement={<Error404 />}
            />
            <Route path="/events" element={<Homepage />}>
              <Route path=":alertID" element={<Alert message="hi" />} />
              {/* alertID needs to be updated to display events */}
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
        {user ? <Footer hideInfo={false} /> : <Footer hideInfo={true} />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
