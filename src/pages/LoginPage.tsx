import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { fetchMember } from "../client/client";

const LoginPage = (): ReactElement => {
  const { setUserID } = useContext(LoginContext);
  const [input, setInput] = useState(""); // value is the value that the user entered

  const navigate = useNavigate();

  function checkIfLoginSaved() {
    const nuid = localStorage.getItem("user");
    if (nuid) {
      navigate("/events");
    }
  }

  async function login() {
    const rez = await isValidLogin(input);
    console.log("is login working");
    if (rez) {
      localStorage.setItem("user", JSON.stringify(`${input}`));
      setUserID(input);
      navigate("/events");
    } else {
      //alert("Error: Invalid NUID");
    }
  }

  async function isValidLogin(nuid: string): Promise<boolean> {
    const member = await fetchMember(nuid);
    console.log("PLEASEEEEE");
    return nuid.length === 9 && isNaN(parseInt(nuid)) && member.activeMember
      && !member.signInBlocked;
  }

  return (
    <div onLoad={checkIfLoginSaved}>
      <div className="flex flex-col justify-end min-h-[68vh] bg-cooper-mobile-festive md:bg-cooper-big-boy bg-cover lg:min-h-[60vh]">
        <form className="flex-col px-8 py-5 bg-transparent-gray rounded-tl-lg rounded-tr-lg lg:invisible">
          <input
            value={input}
            type="text"
            id="nuid-entry"
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 my-4"
            placeholder="NUID"
            required
          />
          <button
            onClick={(e) => login()}
            className="w-full my-2.5 bg-sga-red text-white text-2xl font-semibold rounded-lg px-2.5 py-4 hover:bg-sga-red-hover active:bg-sga-red-active"
          >
            Log In
          </button>
        </form>
      </div>
      <div className="flex justify-center align-center h-64 lg:h-80">
        <img
          className="object-contain max-w-[100%] max-h-[100%]"
          src="https://giving.northeastern.edu/live/image/gid/2/width/1260/height/630/crop/1/src_region/294,25,1751,1483/484_Club_-_Student_Government_Association.jpg"
          alt="Student Government Association Logo"
        />
        <form className="hidden lg:flex flex-col px-20 py-14">
          <input
            value={input}
            type="text"
            id="nuid-entry"
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 my-3 mt-8"
            placeholder="NUID"
            required
          />
          <button
            onClick={(e) => login()}
            className="w-72 my-2.5 bg-sga-red text-white text-2xl font-semibold rounded-lg px-4 py-4 hover:bg-sga-red-hover active:bg-sga-red-active"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
