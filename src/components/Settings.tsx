import { ReactElement, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const Settings = (props: {
  useState: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const { setUserID } = useContext(LoginContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    setUserID(null);
    navigate("/");
  }

  function Click(route: string) {
    navigate(route);
    props.useState(false);
  }

  return (
    // omg what page are we on
    <div className="font-sans font-bold text-xl h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-3 px-8 items-start flex-1">
          <button
            className={`App ${
              useLocation().pathname === "/events"
                ? "underline"
                : "no-underline"
            }`}
            onClick={() => Click("/events")}
          >
            Home
          </button>
          <button
            className={`App ${
              useLocation().pathname === "/user" ? "underline" : "no-underline"
            }`}
            onClick={() => Click("/user")}
          >
            My Preferences
          </button>
          <button
            className={`App ${
              useLocation().pathname === "/record"
                ? "underline"
                : "no-underline"
            }`}
            onClick={() => Click("/record")}
          >
            My Record
          </button>

          <button
            className={`App ${
              useLocation().pathname === "/voting"
                ? "underline"
                : "no-underline"
            }`}
            onClick={() => Click("/voting")}
          >
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
