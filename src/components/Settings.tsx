import { ReactElement, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const Settings = (): ReactElement => {
  const { setUserID } = useContext(LoginContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    setUserID(null);
    navigate("/");
  }

  return (
    <div className="font-sans font-bold text-xl h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-3 px-8 items-start flex-1">
          <button className="text-slate-400" disabled>
            Home
          </button>
          <button className="text-slate-400" disabled>
            Profile
          </button>
          <button onClick={() => navigate("/user")}>Preferences</button>
          <button className="text-slate-400" disabled>
            Voting
          </button>
        </div>

        {/* <div> */}
        <hr className="h-px bg-white border-0 dark:bg-white-700 w-full"></hr>

        <div className="flex p-8">
          <button onClick={() => logout()}>Logout</button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Settings;
