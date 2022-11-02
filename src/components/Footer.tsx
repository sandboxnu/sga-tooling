import { ReactElement } from "react";
import ".././styles.css";

// Footer with source code and project information that goes at the bottom of each page
const Footer = (): ReactElement => {
  return (
    <div className="w-full px-2 py-4 mt-4 flex flex-row justify-between border-t-2 bottom-0 mt-auto">
      <div>
        Made by students @{" "}
        <a
          className="link"
          onClick={() => {
            window.open("https://sandboxnu.com");
          }}
        >
          Sandbox
        </a>
        . Source on{" "}
        <a
          className="link"
          onClick={() => {
            window.open("https://github.com/sandboxnu/sga-tooling");
          }}
        >
          GitHub.
        </a>
      </div>

      <div>
        <a
          className="link"
          onClick={() => {
            window.open(
              "https://github.com/sandboxnu/office-hours/discussions"
            );
          }}
        >
          Give us feedback
        </a>
        <span> or </span>
        <a
          className="link"
          onClick={() => {
            window.open("https://github.com/sandboxnu/office-hours/issues");
          }}
        >
          File a bug report
        </a>
      </div>
    </div>
  );
};

export default Footer;
