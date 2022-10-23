import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <Menu />{" "}
      <Alert
        message="Your standing in SGA may be affected if you miss the next meeting."
        className="max-w-sm"
      />
    </>
  );
}

export default App;
