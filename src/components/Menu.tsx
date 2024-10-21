import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Frame from ".././assets/Frame.svg";
import { LoginContext } from "../App";
import Sidebar from "./Sidebar";

/**
 * Creates a navbar menu with the SGA logo and a predetermined
 * list of quick links that collapse into a hamburger menu.
 *
 * @returns The navbar in a div
 */
const Menu = (): ReactElement => {
  const currentPath = useLocation().pathname;
  const isInVotingPages =
    currentPath === "/voting" || currentPath === "/voting/past";
  const [showSidebar, setShowSidebar] = useState(false);

  // State to store the current screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update the screen width in the state
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add an event listener for the window resize event
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  // Navigation for the buttons on desktop
  let navigate = useNavigate();
  const { setUserID } = useContext(LoginContext);

  function logout() {
    localStorage.removeItem("user");
    setUserID(null);
    navigate("/");
  }

  function Click(route: string) {
    navigate(route);
  }

  return (
    <>
      <div className="flex lg:hidden items-center justify-between space-x-16 md:space-x-0 min-w-100 h-24 bg-sga-red px-5 shadow-md shadow-neutral-400">
        <div>
          <Link to={`/events`}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5939fcd1db29d6ec60929205/1599605891670-HLWDP9UQBSK6XT6DLF3A/SGA+White+Text+Transparent.png%3Fformat=1500w"
              alt="Student Government Association Logo"
              className="w-32 cursor-pointer"
              onClick={() => setShowSidebar(false)}
            />
          </Link>
        </div>

        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      {/* Manually checking for optimization reasons (tailwind can't remove from DOM) */}
      {screenWidth < 1024 && (
        <div id="detail">
          <Outlet />
        </div>
      )}
      {/* Above Is Mobile Design */}
      {/* Below is Desktop Design */}
      {/* TODO: This needs to have some sort of drop shadow*/}
      <div
        className={`fixed top-0 left-0 h-full hidden lg:flex lg:flex-col items-center justify-between w-[19vw] ${
          isInVotingPages ? "bg-transparent-gray shadow-md" : "bg-sga-red"
        }`}
      >
        <div className="flex flex-col items-start w-full h-full">
          {isInVotingPages ? (
            <div className="p-8">
              <div className="flex items-center gap-3">
                <Link to={`/events`}>
                  <img className="h-12 w-12" src={Frame} alt="Back arrow" />
                </Link>
                <span className="font-bold text-xl ">VOTING</span>
              </div>
              <div className="flex flex-col flex-1 gap-5 mt-4 pt-0 pl-8 items-start font-montserrat text-md h-fit">
                <button
                  className={`App ${
                    currentPath === "/voting" ? "font-bold text-sga-red" : ""
                  } `}
                  onClick={() => Click("/voting")}
                >
                  Current Vote
                </button>
                <button
                  className={`App ${
                    currentPath === "/voting/past"
                      ? "font-bold text-sga-red"
                      : ""
                  }`}
                  onClick={() => Click("/voting/past")}
                >
                  Past Votes
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to={`/events`} className="p-8">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5939fcd1db29d6ec60929205/1599605891670-HLWDP9UQBSK6XT6DLF3A/SGA+White+Text+Transparent.png%3Fformat=1500w"
                  alt="Student Government Association Logo"
                  className="w-48 cursor-pointer"
                  onClick={() => setShowSidebar(false)}
                />
              </Link>
              <div className="flex flex-col flex-1 gap-5 mt-4 p-8 pt-0 items-start font-sans font-bold text-white text-xl h-fit">
                <button
                  className={`App hover:text-slate-200 ${
                    currentPath === "/events" ? "underline" : "no-underline"
                  }`}
                  onClick={() => Click("/events")}
                >
                  Home
                </button>
                <button
                  className={`App hover:text-slate-200 ${
                    currentPath === "/user" ? "underline" : "no-underline"
                  }`}
                  onClick={() => Click("/user")}
                >
                  Preferences
                </button>
                <button
                  className={`App hover:text-slate-200 ${
                    currentPath === "/record" ? "underline" : "no-underline"
                  }`}
                  onClick={() => Click("/record")}
                >
                  Record
                </button>
                <button
                  className={`App hover:text-slate-200 ${
                    currentPath === "/voting" ? "underline" : "no-underline"
                  }`}
                  onClick={() => Click("/voting")}
                >
                  Voting
                </button>
              </div>

              <div className="flex items-start font-sans font-bold text-white text-xl h-fit w-full border-t-4 border-gray-300 border-opacity-70 p-8 pt-4 hover:text-slate-200">
                <button onClick={logout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
