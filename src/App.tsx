import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import RequireAuth from "./components/RequireAuth";
import AttendanceRecordPage from "./pages/AttendanceRecordPage";
import Error404 from "./pages/Error404";
import EventDetailsPage from "./pages/EventDetailsPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { PastVotesComponent } from "./pages/PastVotes";
import UserPreference from "./pages/UserPreference";
import { VotingPage } from "./pages/VotingPage";

export type UserID = string | null;

type UserContext = {
  userID: UserID;
  setUserID: React.Dispatch<React.SetStateAction<UserID>>;
};

export const LoginContext = createContext<UserContext>({
  userID: null,
  setUserID: () => {},
});

export const queryClient = new QueryClient();

function App() {
  const [userID, setUserID] = useState<UserID>(localStorage.getItem("user"));

  return (
    <LoginContext.Provider value={{ userID, setUserID }}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen justify-between">
          <Router>
            <div className={`${userID && " lg:flex lg:min-h-fit "}`}>
              {userID ? (
                <>
                  <Menu />
                  <div className="hidden lg:block lg:min-w-[19vw]"></div>
                </>
              ) : null}

              <Routes>
                <Route
                  path="/"
                  element={<LoginPage />}
                  errorElement={<Error404 />}
                />
                <Route element={<RequireAuth />}>
                  <Route path="/events" element={<Homepage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />
                  <Route path="/user/" element={<UserPreference />} />
                  <Route path="/record" element={<AttendanceRecordPage />} />
                  <Route path="/voting" element={<VotingPage />} />
                  <Route path="/voting/past" element={<PastVotesComponent />} />
                </Route>

                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </Router>
          {userID ? (
            <div className="lg:flex">
              {/* Used to take into account the always-visible side bar */}
              <div className="hidden lg:block lg:min-w-[19vw]"></div>
              <Footer hideInfo={false} />
            </div>
          ) : (
            <Footer hideInfo={true} />
          )}
        </div>
      </QueryClientProvider>
    </LoginContext.Provider>
  );
}

export default App;
