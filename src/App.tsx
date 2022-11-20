import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Alert from './components/Alert';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Menu from './components/Menu';
import Homepage from "./Homepage";

export type User = string | null;

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const nuid = localStorage.getItem("user");
    if (nuid) {
      setUser(nuid)
    }
    
  }, [])

  return (
      <LoginContext.Provider value={{user, setUser}}>
        <div className="flex min-h-screen flex-col justify-between">
        <Homepage/>
          /*{user ? <Menu /> : null}
          <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} errorElement={<Error404 />} />
                <Route path="/events" element={<></>}>
                  {/* :alerID needs to be updated to display Events */}
                  <Route path=":alertID" element={<Alert message='hi'/>} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>*/
          <Footer />
        </div>
      </LoginContext.Provider>
  );
}

export default App;
