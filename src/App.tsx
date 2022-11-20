import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import EventCard from "./components/EventCard";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

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
    <>
      {/* pages to be updated once routing is provided */}
      {/* <LoginContext.Provider value={{user, setUser}}>
        <LoginPage />
        <Footer />
        <Menu/>
      </LoginContext.Provider> */}

      <div className="flex min-h-screen flex-col justify-between">
        <Menu />
        <div className="flex flex-row">
          <div className="w-1/5 md:w-[10%]">placeholder for dates whee</div>
          <EventCard
            startTime={new Date()}
            name="Sample Event 1"
            location="WVF 020"
            description="Sample text. Please don’t read this area. If you do you may be subject to legal action. The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal."
            live={false}
          />
        </div>
        <div className="flex flex-row">
          <div className="w-1/5 md:w-[10%]">this be the live event</div>
          <EventCard
            startTime={new Date()}
            name="Sample Event 2"
            location="Afterhours, Curry Student Center"
            description="The organizer of this event has chosen to notify you about it. The agenda is to vibe to Lil Nas X."
            live={true}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
