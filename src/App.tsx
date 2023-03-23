import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import RequireAuth from "./components/RequireAuth";
import Error404 from "./pages/Error404";
import EventDetailsPage from "./pages/EventDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";

export type UserID = string | null;

type UserContext = {
  userID: UserID;
  setUserID: React.Dispatch<React.SetStateAction<UserID>>;
};

export const LoginContext = createContext<UserContext>({ userID: null, setUserID: () => { } });

function App() {
  const [userID, setUserID] = useState<UserID>(localStorage.getItem("user"));

  return (
    <LoginContext.Provider value={{ userID, setUserID }}>
      <div className="flex min-h-screen flex-col justify-between">
        {userID ? <Menu /> : null}
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginPage />}
              errorElement={<Error404 />}
            />
            <Route element={<RequireAuth />}>
              <Route path="/events" element={<Homepage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
        {userID ? <Footer hideInfo={false} /> : <Footer hideInfo={true} />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
