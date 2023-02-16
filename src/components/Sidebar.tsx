import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Settings from "./Settings";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        <button
          aria-label="Open settings menu"
          className="flex text-3xl text-white items-center cursor-pointer fixed right-10 top-6 z-50 right-6"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <XMarkIcon className="w-12 fill-warning-dark flex-none stroke-white" />
        </button>
      ) : (
        <Bars3Icon className="w-12 fill-warning-dark flex-none fill-white" onClick={() => setShowSidebar(!showSidebar)} />
      )}

      <div
        className={`top-0 right-0 w-screen md:w-[35vw] bg-sga-red p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"
          }`}
      >
        <h3 className="mt-20 text-4xl font-semibold text-white">
          <Settings />
        </h3>
      </div>
    </>
  );

};

export default Sidebar; 