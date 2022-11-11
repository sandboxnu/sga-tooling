import React, { useState } from "react";
import "./App.css";
import EventCard from "./components/EventCard";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

export type User = number | null;

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

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

      <Menu />
      <div className="flex flex-row">
        <div className="w-1/5">placeholder for dates whee</div>
        <EventCard
          startTime={new Date()}
          name="Sample Event"
          location="WVF 020"
          description="Sample text. Please don't read this area. If you do you may be subject to legal action."
          live={false}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
