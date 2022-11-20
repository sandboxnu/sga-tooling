import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Homepage from "./Homepage";

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
        <Homepage />
        {/*
        {user ? <Menu /> : null}
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
              errorElement={<Error404 />}
            />
            <Route path="/events" element={<></>}>
              <Route path=":alertID" element={<Alert message="hi" />} />
              alertID needs to be updated to display events
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router> */}
        <Footer />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
