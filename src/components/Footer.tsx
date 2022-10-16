<<<<<<< HEAD
import React from 'react';

const Footer  = (): JSX.Element => {
    return (
        <></>
    );
}

export default Footer;
=======
import React from "react";
import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <div className="w-full px-2 py-4 mt-4 flex flex-row justify-between border-t-2 absolute bottom-0">
      <div>
        Made{" "}
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={() => {
            window.open("/about");
          }}
        >
          by students
        </a >{" "}
        @{" "}
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={() => {
            window.open("https://sandboxnu.com");
          }}
        >
          Sandbox
        </a>
        . Source on{" "}
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={() => {
            window.open("https://github.com/sandboxnu/office-hours");
          }}
        >
          GitHub.
        </a>
      </div>

      <div>
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          onClick={() => {
            window.open(
              "https://github.com/sandboxnu/office-hours/discussions"
            );
          }}
        >
          Give us feedback
        </a>
        <span> or </span>
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
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
>>>>>>> fb6e5fc (initial commit)
