import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Creates a navbar menu with the SGA logo and a predetermined
 * list of quick links that collapse into a hamburger menu.
 *
 * @returns The navbar in a div
 */
const Menu = (): ReactElement => {

  return (
    <div>
      <div className="flex items-center justify-between space-x-16 md:space-x-0 lg:space-x-0 min-w-100 h-24 bg-sga-red px-5 shadow-md shadow-neutral-400">
        <div>
          <img
            src="https://images.squarespace-cdn.com/content/v1/5939fcd1db29d6ec60929205/1599605891670-HLWDP9UQBSK6XT6DLF3A/SGA+White+Text+Transparent.png%3Fformat=1500w"
            alt="Student Government Association Logo"
            className="w-32"
          />
        </div>

        <Sidebar />


      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>

  );
};

export default Menu;