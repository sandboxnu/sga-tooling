import React from "react";
import logo from "./logo.svg";
import Footer from "./components/Footer";
import "./App.css";
import Menu from "./components/Menu";
import EventCard from "./components/EventCard";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-start">
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
