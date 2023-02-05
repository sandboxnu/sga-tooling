import { ReactElement, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../App";

const Settings = (): ReactElement => {

    const navigate = useNavigate();
    const { setUser } = useContext(LoginContext); 

    function LogOut() {
        localStorage.removeItem("user");  
        setUser(null); 
        navigate("/"); 
    }
    

    return (
        <div className="flex items-start flex-col h-full text-2xl absolute left-10 top-7 z-50 right-5">
            <h1 className="text-4xl">SETTINGS</h1>
            <button>Home</button>                         
            <button>Profile</button>
            <button>Preferences</button>
            <button>Voting</button>
            <button className="absolute bottom-20" onClick={() => LogOut()}>Logout</button>
        </div>
    ); 
}

export default Settings; 