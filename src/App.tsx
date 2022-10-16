import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import Footer from './components/Footer';
import './App.css';
import Menu from './components/Menu';
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
<<<<<<< HEAD
    <LoginContext.Provider value={{user, setUser}}>
      <LoginPage />
    </LoginContext.Provider>
=======
    <Footer />
>>>>>>> fb6e5fc (initial commit)
  );
}

export default App;
