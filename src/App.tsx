import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Alert from './components/Alert';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Menu from './components/Menu';

export type User = number | null;

type UserContext = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
};

export const LoginContext = createContext<UserContext>({} as UserContext);

function App() {

  const [user, setUser] = useState<User | null>(null)

  return (
    <LoginContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} errorElement={<Error404 />} />
            <Route path="/events" element={<Menu />}>
              <Route path=":alertID" element={<Alert message='hi'/>} />
            </Route>
            <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;
