import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

/**
 * Creates a navbar menu with the SGA logo and a predetermined
 * list of quick links that collapse into a hamburger menu.
 *
 * @returns The navbar in a div
 */
const Menu = (): ReactElement => {
  const navigation = ["Calendar", "Events", "Attendance"];

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

        <ul className="flex items-center justify-around space-x-8">
          {navigation.map((elem: string) => {
            return (
              <li key={elem}>
                <a
                  href={elem}
                  className="text-white hover:text-black hidden sm:block sm:text-xl"
                >
                  {elem}
                </a>
              </li>
            );
          })}
        </ul>

        <svg
          aria-label="menu icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-12 h-12 sm:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>

  );
};

export default Menu;
