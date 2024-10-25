import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorSvg from "../assets/ErrorBubble.svg";
import TriangleError from "../assets/TriangleError.svg";
import UnknownError from "../assets/UnknownError.svg";
import PopUp from "../components/PopUp";
import { useAuth } from "../hooks/useAuth";
import { LoginError } from "../util/Types";

const LoginPage = (): ReactElement => {
  const { member, login } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState(""); // value is the value that the user entered
  const [lastName, setLastName] = useState(""); // value to keep track of inputted last name
  const [errorType, setErrorType] = useState<LoginError>(LoginError.NONE);
  const [smallErrMsg, setSmallErrMsg] = useState<String>();

  /**
   * Attempt to sign in. If successful, navigate to the events page.
   * Validates the NUID inputted by the user. If it is not valid, display an error message.
   */
  async function signin() {
    setErrorType(LoginError.NONE); // No error message before they get a response back
    if (!isValidNuid(input)) {
      console.log("Invalid NUID when log in pressed.");
      setSmallErrMsg("Should be 9 digits.");
      setErrorType(LoginError.OTHER);
      return;
    }
    let error = await login(input, lastName);
    if (error === undefined) {
      navigate("/events");
    } else {
      switch (error) {
        case "User not found":
          setErrorType(LoginError.DOES_NOT_EXIST);
          break;
        case "User not active":
          setErrorType(LoginError.DEACTIVATED);
          break;
        case "User blocked":
          setErrorType(LoginError.BLOCKED);
          break;
        default:
          setErrorType(LoginError.UNKNOWN);
          break;
      }
    }
  }

  /**
   * Checks if an inputted NUID is a valid NUID
   * @param nuid A string representing an NUID
   * @returns true if the given string has a length of 9 and is a valid integer, false otherwise
   */
  function isValidNuid(nuid: string): boolean {
    return nuid.length === 9 && !isNaN(parseInt(nuid));
  }

  // useEffect(() => {
  //   if (member) {
  //     navigate("/events");
  //   }
  // }, [member, navigate]);

  return (
    <div onLoad={() => member === undefined ?? navigate("/events")}>
      {errorType === LoginError.DEACTIVATED ? (
        <PopUp
          source={TriangleError}
          message1="Your account has been deactivated."
          message2="Please contact your administrator if this is a mistake."
          useState={setErrorType}
        />
      ) : null}
      {errorType === LoginError.BLOCKED ? (
        <PopUp
          source={TriangleError}
          message1="You are not allowed to log in."
          message2="Please contact your administrator if this is a mistake."
          useState={setErrorType}
        />
      ) : null}
      {errorType === LoginError.UNKNOWN ? (
        <PopUp
          source={UnknownError}
          message1="We ran into an unknown error."
          link="Please report this bug."
          useState={setErrorType}
        />
      ) : null}
      {/* MOBILE APP DIV */}
      <div className="flex flex-col justify-end min-h-[68vh] bg-cooper-mobile-festive md:bg-cooper-big-boy bg-cover lg:min-h-[60vh]">
        <div className="flex-col px-8 py-5 bg-transparent-gray rounded-tl-lg rounded-tr-lg lg:invisible">
          <input
            value={input}
            type="text"
            id="nuid-entry"
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 mt-1"
            placeholder="NUID"
            required
          />
          <input
            value={lastName}
            type="text"
            id="nuid-entry"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 mt-1"
            placeholder="Last name"
            required
          />
          <button
            onClick={(e) => login(input, lastName)}
            className="w-full my-2.5 bg-sga-red text-white text-2xl font-semibold rounded-lg px-2.5 py-4 hover:bg-sga-red-hover active:bg-sga-red-active"
          >
            Log In
          </button>
          {errorType === 1 && smallErrMsg && (
            <div className="flex flex-start">
              <img src={ErrorSvg} alt="Error icon" className="h-5" />
              <p className="font-sans text-sga-red px-2">{smallErrMsg}</p>
            </div>
          )}
        </div>
      </div>
      {/* MOBILE APP DIV END/ DESKTOP START */}
      <div className="flex justify-center align-center h-64 lg:h-80">
        <img
          className="object-contain max-w-full max-h-full"
          src="https://giving.northeastern.edu/live/image/gid/2/width/1260/height/630/crop/1/src_region/294,25,1751,1483/484_Club_-_Student_Government_Association.jpg"
          alt="Student Government Association Logo"
        />
        <div className="hidden lg:flex flex-col px-20 py-14">
          <input
            value={input}
            type="text"
            id="nuid-entry"
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 my-1 mt-1"
            placeholder="NUID"
            required
          />
          <input
            value={lastName}
            type="text"
            id="nuid-entry"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-50 border border-black text-black text-xl rounded-lg focus:ring-black-500 focus:border-black-500 block px-2.5 py-4 my-1 mt-1"
            placeholder="Last name"
            required
          />
          <button
            onClick={(e) => signin()}
            className="w-72 my-2.5 bg-sga-red text-white text-2xl font-semibold rounded-lg px-4 py-4 hover:bg-sga-red-hover active:bg-sga-red-active"
          >
            Log In
          </button>
          {errorType === LoginError.OTHER && smallErrMsg && (
            <div className="flex flex-start">
              <img src={ErrorSvg} alt="Error icon" className="h-5" />
              <p className="font-sans text-sga-red px-2">{smallErrMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
