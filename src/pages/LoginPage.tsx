import axios from "axios";
import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import ErrorSvg from "../assets/ErrorBubble.svg";
import TriangleError from "../assets/TriangleError.svg";
import UnknownError from "../assets/UnknownError.svg";
import { loginMember } from "../client/login";
import PopUp from "../components/PopUp";
import { Member } from "../util/Types";

const LoginPage = (): ReactElement => {
  const { setUserID } = useContext(LoginContext);
  const [input, setInput] = useState(""); // value is the value that the user entered
  const [lastName, setLastName] = useState(""); // value to keep track of inputted last name
  const [errorType, setErrorType] = useState(0); // type of error that occured when we log in 0-3
  const [smallErrMsg, setSmallErrMsg] = useState<String>();

  const navigate = useNavigate();

  /**
   * Checks the local storage to find the user and navigate them to the events page
   */
  // might be a bit weird, might need some other functionality where if there is no id, pop up an error...
  function checkIfLoginSaved() {
    const nuid = localStorage.getItem("user");
    if (nuid) {
      navigate("/events");
    }
  }

  // TODO: figure out whether I want to convert each of these to their corresponding types on the frontend...
  // lint will yell at this, but will fix later...
  function parseMember(response: any): Member {
    const member: Member = {
      id: response.uuid,
      nuid: response.nuid,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      activeMember: response.active_member,
      votingRights: response.voting_rights,
      receiveNotPresentEmail: response.receive_not_present_email,
      includeInQuorum: response.include_in_quorum,
      signInBlocked: response.sign_in_blocked,
    };
    console.log(member);
    return member;
  }

  /**
   * Checks if a valid NUID is inputted. If it isn't valid, return an error message.
   * If it isn't a member, return an error message.
   * If it is a member, check if if the member has access. If it has access, store
   * the member as a user in local storage. If it's not an active member or it's
   * sign in is blocked, display the aapropriate error message
   */
  async function login() {
    setErrorType(0); // No error message before they get a response back
    if (!isValidNuid(input)) {
      setSmallErrMsg("Should be 9 digits.");
      setErrorType(1);
      return;
    }

    try {
      // some loading state while this is happening is necessary
      const responseData = await loginMember(input, lastName);
      // parse (later with JWTs this will require more) the axios data into a MemberType
      const member: Member = parseMember(responseData.member);
      console.log(member);

      if (whetherHasAccess(member)) {
        // add to local storage
        console.log("should be here");
        localStorage.setItem("user", input);
        setUserID(input);
        navigate("/events");
      } else if (member.activeMember) {
        setErrorType(2);
      } else if (member.signInBlocked) {
        setErrorType(3);
      } else {
        // catch all for weird behavior...
        setErrorType(4);
      }
    } catch (e) {
      // maybe need to return in these cases?
      if (axios.isAxiosError(e)) {
        // Member not found
        if (e.response!.status === 400) {
          setErrorType(3);
        } else {
          setErrorType(4);
        }
      }
      // this should not happen, so still give an unknown error
      else {
        setErrorType(4);
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

  /**
   * Checks whether the inputted Member has access
   * @param member The member being checked
   * @returns true if the given member is an active member and is not blocked from sign in, false otherwise
   */
  function whetherHasAccess(member: Member): boolean {
    return member.activeMember && !member.signInBlocked;
  }

  return (
    <div onLoad={checkIfLoginSaved}>
      {errorType === 2 ? (
        <PopUp
          source={TriangleError}
          message1="Your account has been inactivated."
          message2="Please contact your administrator if this is a mistake."
          useState={setErrorType}
        />
      ) : null}
      {errorType === 3 ? (
        <PopUp
          source={TriangleError}
          message1="You are not allowed to log in."
          message2="Please contact your administrator if this is a mistake."
          useState={setErrorType}
        />
      ) : null}
      {errorType === 4 ? (
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
            onClick={(e) => login()}
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
            onClick={(e) => login()}
            className="w-72 my-2.5 bg-sga-red text-white text-2xl font-semibold rounded-lg px-4 py-4 hover:bg-sga-red-hover active:bg-sga-red-active"
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
    </div>
  );
};

export default LoginPage;
