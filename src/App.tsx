import React, { createContext, useState } from 'react';
import './App.css';
import Error404 from './components/Error404';
import Footer from './components/Footer';

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
        {/*<LoginPage />*/}
        <Error404 />
        <Footer />
      </LoginContext.Provider>
    </>
  );
  
}

export default App;
