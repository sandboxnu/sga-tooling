import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Settings from "./Settings";

/**
 * This sidebar is for the mobile responsive version. NOT for the desktop version, that is Menu.tsx
 *
 * Represents a sidebar with settings options
 * This slides in an out depending on if the user clicks the hamburger icon
 */
const Sidebar = (props: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* This boolean statement decides whether to show the sidebar or not. */}
      {!props.showSidebar && (
        <Bars3Icon
          className="w-12 fill-warning-dark flex-none fill-white cursor-pointer"
          onClick={() => props.setShowSidebar(!props.showSidebar)}
        />
      )}

      {/* Div for the sidebar and how it looks */}
      <div
        className={`flex flex-col fixed top-0 right-0 h-screen w-screen md:w-[35vw] bg-sga-red text-white z-40 ease-in-out duration-300 ${
          props.showSidebar
            ? "translate-x-0 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            : "translate-x-full"
        }`}
      >
        <div className="flex p-8 items-center">
          <h1 className="text-3xl text-white font-sans font-bold">PAGES</h1>
          <button
            aria-label="Open settings menu"
            className="flex text-3xl text-white items-center cursor-pointer fixed top-6 z-40 right-6"
            onClick={() => props.setShowSidebar(!props.showSidebar)}
          >
            <XMarkIcon className="w-12 fill-warning-dark flex-none stroke-white" />
          </button>
        </div>
        <Settings useState={props.setShowSidebar} />
      </div>
    </>
  );
};

export default Sidebar;
