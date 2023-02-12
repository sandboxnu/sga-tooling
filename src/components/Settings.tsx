import { ReactElement, useContext } from "react";
import { LoginContext } from "../App";

const Settings = (): ReactElement => {
    const { setUser } = useContext(LoginContext);

    function logout() {
        localStorage.removeItem("user");
        setUser(null); 
    }

    return (
        <div className="flex items-start flex-col h-full text-xl absolute left-10 top-7 z-50 right-5 leading-loose font-sans font-bold">
            <h1 className="text-3xl">SETTINGS</h1>
            <button className="text-slate-400">Home</button>
            <button className="text-slate-400">Profile</button>
            <button className="text-slate-400">Preferences</button>
            <button className="text-slate-400">Voting</button>

            <hr className="absolute bottom-40 h-px bg-white border-0 dark:bg-white-700 w-full"></hr>

            <button className="absolute bottom-20" onClick={() => logout()}>Logout</button>
        </div>
    );
}

export default Settings; 