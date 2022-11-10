<<<<<<< HEAD
import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import Footer from "./components/Footer";
import "./App.css";
import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import EventCard from "./components/EventCard";

export type User = number | null;

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <>
      <LoginContext.Provider value={{ user, setUser }}>
        <div className="flex min-h-screen flex-col justify-start">
          <LoginPage />
          <div className="flex flex-row">
            <div className="w-1/5 md:w-[10%]">placeholder for dates whee</div>
            <EventCard
              startTime={new Date()}
              name="Sample Event 1"
              location="WVF 020"
              description="Sample text. Please don’t read this ar ea. If you do you may be subject to legal action. The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal."
              live={false}
            />
            {/*<Menu/>*/}
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
=======
import React, { createContext, useState } from 'react';
import Footer from './components/Footer';
import './App.css';
import LoginPage from './components/LoginPage';

export type User = number | null

type UserContext = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {


  const [user, setUser] = useState<User | null>(null)

  return (
    <>
      <LoginContext.Provider value={{user, setUser}}>
        <LoginPage />
        <Footer />
        {/*<Menu/>*/}
>>>>>>> master
      </LoginContext.Provider>
    </>
  );
  
}

export default App;
