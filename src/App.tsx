import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Users from "./data/users.json";
import Error404 from "./pages/Error404";
import EventDetailsPage from "./pages/EventDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import UserPreference, { Member } from "./pages/UserPreference";

export type User = string | null;

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const member: Member = (Users as unknown as Member[])[0];

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
            <Route path="/events" element={<Homepage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/user/" element={<UserPreference member={member} />} />
          </Routes>
        </Router>
        {user ? <Footer hideInfo={false} /> : <Footer hideInfo={true} />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
