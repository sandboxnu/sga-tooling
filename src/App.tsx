import React, { createContext, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import EventCard from "./components/EventCard";
import Error404 from "./components/Error404";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import SearchIcon from "./SearchIcon.svg";


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
        {/* <LoginPage /> */}

        <h1 className="section-heading">HAPPENING NOW</h1>

        <EventCard
          startTime={new Date()}
          name="Sample Event 1"
          location="WVF 020"
          description="Sample text. Please don’t read this ar ea. If you do you may be subject to legal action. The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal."
          live={true}
        />

        <hr className="hr" />

        <div className="section-heading flex justify-between items-center">
          <h1>UPCOMING EVENTS</h1>
          <img src={SearchIcon} aria-label="Search for an event"></img>
        </div>

        <Alert
          message="Your standing in SGA may be affected if you miss the next event."
          className="home-mx mt-5 bg-alert-yellow"
        />

        <EventCard
          startTime={new Date()}
          name="Sample Event 2"
          location="Afterhours, Curry Student Center"
          description="The organizer of this event has chosen to notify you about it. The agenda is to vibe to Lil Nas X."
          live={false}
        />
        <hr className="hr" />
        <EventCard
          startTime={new Date()}
          name="Sample Event 2"
          location="Afterhours, Curry Student Center"
          description="The organizer of this event has chosen to notify you about it. The agenda is to vibe to Lil Nas X."
          live={false}
        />
        <Footer />
      </main>
    </LoginContext.Provider>
  );
}

export default App;
