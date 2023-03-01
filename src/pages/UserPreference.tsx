import { ReactElement } from "react";
import "tw-elements";

export type Member = {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  activeMember: Boolean;
  votingRights: Boolean;
  receiveNotPresentEmail: Boolean;
  includeInQuorum: Boolean;
  signInBlocked: Boolean;
};

export type UserPreferenceProp = {
  member: Member;
};

const UserPreference = ({ member }: UserPreferenceProp): ReactElement => {
  return (
    <div className="flex flex-col flex-1 p-4 font-sans md:p-10 gap-y-8">
      <div className="flex flex-col font-sans font-bold">
        <span className="text-gray-600 text-xl"> Hello,</span>
        <span className="section-heading m-0"> NORTHEASTERN SGA</span>
      </div>

      <div className="flex flex-col px-7 font-sans gap-8">
        <span className="font-bold text-xl">CONTACT INFO</span>
        <div className="flex gap-x-12">
          <div>
            <span className="text-gray-600">Name</span> <br />
            {member.firstName + " " + member.lastName}
          </div>
          <div>
            <span className="text-gray-600">Pronouns</span> <br />
            <span> Huskies/Rock</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>{member.email}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-600">Phone Number</span>
          <span> +1 (911) 911 - 1911</span>
        </div>

        <hr className="border-black home-mx -ml-7 -mr-7" />

        <div className="flex flex-col font-sans font-bold">
          <span>YOUR GROUPS</span>
          <div className="flex flex-row flex-wrap gap-6 p-4 text-sm">
            <div className="bg-tag-green rounded-lg px-4 py-1">Steast</div>
            <br />
            <div className="bg-tag-blue rounded-lg px-4 py-1">
              Food Advisory Board
            </div>
            <br />
            <span className="bg-yellow-400 rounded-lg px-4 py-1">
              Diverstiy, Equity, and Inclusion
            </span>
          </div>
        </div>
        <hr className="border-black -ml-7 -mr-7" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex">
            <div className="flex gap-x-12">
              <span>Recieve Notifications before my events</span>

              <div className="form-check form-switch">
                <input
                  className="form-check-input appearance-none w-9 -ml-10 rounded-full h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                  type="checkbox"
                  role="switch"
                  checked={member.receiveNotPresentEmail as boolean}
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
