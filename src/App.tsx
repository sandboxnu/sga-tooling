import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import { Event, Status } from "./components/EventCard";
import EventDetails from "./components/EventDetails";
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
  }, [])

  const SampleEvent: Event = {
    startTime: new Date(5000000),
    endTime: new Date(5000001),
    name: "Sample Event 5",
    location: "Steast",
    description: "Sample Data to try and get my component to not error :-)",
    status: Status.Live,
    tags: ["Sample Event"]
  }

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
            <Route path="/event-details" element={<EventDetails event={SampleEvent}/>} />
          </Routes>
        </Router>
        {user ? <Footer hideInfo={false} /> : <Footer hideInfo={true} />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
