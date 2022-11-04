import React from "react";
import logo from "./logo.svg";
import Footer from "./components/Footer";
import "./App.css";
import Menu from "./components/Menu";
import EventCard from "./components/EventCard";

function App() {
  return (
    <>
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
