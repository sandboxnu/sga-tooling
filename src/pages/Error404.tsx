import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ErrorIconSVG from "../assets/errorIcon.svg";

/**
 * Displays error page
 */
const Error404 = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[65vh] lg:h-[100vh] w-full">
      <img src={ErrorIconSVG} alt="" />
      <div className="flex flex-col items-center font-sans mt-1 mb-12">
        <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-xl text-center max-w-sm">
          We can't find the page you're looking for. Contact the site owner if
          this is a mistake.{" "}
        </p>
      </div>
      <button
        onClick={() => navigate("/events")}
        className="button-base-red rounded-xl py-3 px-14"
      >
        Return to home
      </button>
    </div>
  );
};

export default Error404;
