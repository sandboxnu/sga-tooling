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
      <EventCard
        time="8-11am"
        name="Sample Event"
        location="WVF 020"
        description="Sample text. Please don't read this area. If you do you may be subject to legal action."
      />
      <Footer />
    </>
  );
}

export default App;
