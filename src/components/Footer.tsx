import { ReactElement } from "react";
import ChevronRightSVG from ".././assets/ChevronRight.svg";
import ".././styles.css";

// Footer with source code and project information that goes at the bottom of each page
const Footer = (): ReactElement => {
  return (
    <div className="w-full px-6 py-4 mt-4 flex flex-row justify-between bottom-0 bg-sga-red md:py-6 md:px-8">
      <div className="font-montserrat text-base font-bold text-white">
        Made by Sandbox
      </div>

      <div>
        <a
          href="https://github.com/sandboxnu/office-hours/discussions"
          className="font-montserrat text-base font-medium text-white flex flex-row"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
          <img
            src={ChevronRightSVG}
            alt="ChevronRight svg"
            aria-label="Learn More About Sandbox"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
