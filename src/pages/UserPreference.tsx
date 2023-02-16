import { ReactElement } from "react";
import "tw-elements";
import USERS from "../data/users.json";

// Questions for Standup, should the fields be input fields, and the text should be placeholders? or still static
//What is a person object, is it just user.json because a lot of the fields don't match?
//render the items in either rows or columns

//recieve not present email, only one to customize

export type Person = {
  id: String;
  firstName: String;
  lastName: String;
  activeMember: Boolean;
  votingRights: Boolean;
  recieveNotPresentEmail: Boolean;
  includeInQuorum: false;
  signInBlocked: false;
};
/*
id,
firstName,
lastName,
activeMember,
votingRights,
recieveNotPresentEmail,
includeInQuorum,
signInBlocked}:Person
*/

const UserPreference = (): ReactElement => {
  let SampleUser = USERS[0];

  return (
    <div className="flex flex-col flex-1 p-4 font-sans md:p-10 gap-y-8">
      <div className="flex flex-col font-sans font-bold ">
        <span className="text-gray-600 text-xl"> Hello,</span>
        <span className="section-heading m-0"> NORTHEASTERN SGA</span>
      </div>

      <div className="flex flex-col px-7 " style={{ gap: "2rem" }}>
        <span className="font-bold text-xl">CONTACT INFO</span>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col">
            <span className="text-gray-600">Name</span>
            <input placeholder={SampleUser.firstName} />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Pronouns</span>
            <span> Huskies/Rock</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>northeastern@isbetterthanbu.com</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-600">Phone Number</span>
          <span> +1 (911) 911 - 1911</span>
        </div>

        <hr className="border-black home-mx -ml-7 -mr-7" />

        <div className="flex flex-col font-sans font-bold">
          <span>YOUR GROUPS</span>
          <div className="flex flex-row flex-wrap gap-10 p-4 text-sm">
            <span className="bg-tag-green rounded-lg px-4 py-1">Steast</span>
            <span className="bg-tag-blue rounded-lg px-4 py-1 ">
              Food Advisory Board
            </span>
            <span className="bg-yellow-400 rounded-lg px-4 py-1">
              Diverstiy, Equity, and Inclusion
            </span>
          </div>
        </div>
        <hr className="border-black -ml-7 -mr-7" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex flex-row justify-between">
            {/* Remove this to have the other version*/}
            <div className="flex flex-col">
              <div className="flex">
                <span>Recieve Notifications before my events</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault56"
                  />
                </div>
              </div>

              <div className="flex">
                <span>Recieve Notifications when new events are made</span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault56"
                  />
                </div>
              </div>
            </div>

            {/* Remove this to have the other version*/}
            <div className="flex flex-col">
              <span className="">Recieve Notifications before my events</span>
              <div className="flex flew row justify-evenly">
                <select className="border border-black rounded-md">
                  <option>Text</option>
                </select>

                <select className="border border-black rounded-md">
                  <option>5 minutes</option>
                  <option>30 minutes</option>
                </select>
              </div>

              <span className="text-gray-600">Add new notifications</span>
              <span className="">
                Recieve Notifications when new events are made
              </span>
            </div>

            <div className="flex flex-col">
              <div className="form-check form-switch">
                <input
                  className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault56"
                />
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault56"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
