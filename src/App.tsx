import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <LoginContext.Provider value={{user, setUser}}>
      <LoginPage />
    </LoginContext.Provider>
  );
}

export default App;
