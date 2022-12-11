import { ReactElement } from "react";
import ChevronRightIconSVG from ".././assets/ChevronRightIcon.svg";
import GithubIconSVG from ".././assets/GithubIcon.svg";
import InstagramIconSVG from ".././assets/InstagramIcon.svg";
import InternetWebIconSVG from ".././assets/InternetWebIcon.svg";
import ".././styles.css";

// Footer with source code and project information that goes at the bottom of each page
const Footer = (props: { hideInfo: boolean }): ReactElement => {
  return (
    <div className="w-full px-6 py-6 mt-4 flex flex-col justify-between bottom-0 bg-sga-red md:py-6 md:px-8 md:items-center">
      <div className="flex flex-row justify-between items-center pb-1">
        <div className="font-montserrat text-xl font-bold text-white">
          Made by Sandbox
        </div>

        {props.hideInfo ? (
          <div className="">
            <a
              href="https://github.com/sandboxnu/sga-tooling/issues"
              className="font-montserrat text-base font-medium text-white flex flex-row md:ml-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit a bug
              <img src={ChevronRightIconSVG} alt="ChevronRightIcon svg" />
            </a>
          </div>
        ) : null}
      </div>

      {!props.hideInfo ? (
        <>
          <div className="flex flex-col md:flex-row md:gap-x-2">
            <a
              href="https://github.com/sandboxnu/sga-tooling"
              className="font-montserrat text-base font-medium text-white flex flex-row"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
            <p className="text-white hidden md:inline">|</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc_bunGiJFMXSaM4D9ojlcKMuyNqtAFDCUkxs9Ep2Z3sZh9aw/viewform?usp=sf_link"
              className="font-montserrat text-base font-medium text-white flex flex-row"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave feedback
            </a>
            <p className="text-white hidden md:inline">|</p>
            <a
              href="https://github.com/sandboxnu/sga-tooling/issues"
              className="font-montserrat text-base font-medium text-white flex flex-row"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit a bug
            </a>
          </div>

          <div className="flex flex-row gap-x-6 mt-6">
            <a
              href="https://www.sandboxnu.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={InternetWebIconSVG} alt="InternetWebIcon svg" />
            </a>
            <a
              href="https://www.instagram.com/sandboxnu/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={InstagramIconSVG} alt="InstagramIcon svg" />
            </a>
            <a
              href="https://github.com/sandboxnu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubIconSVG} alt="GithubIcon svg" />
            </a>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
