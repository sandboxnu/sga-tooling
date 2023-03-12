import { ReactElement } from "react";
import "tw-elements";

export type Member = {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  activeMember: Boolean;
  votingRights: Boolean;
  receiveNotPresentEmail: boolean;
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
        <div>
          <span className="text-gray-600">Name</span> <br />
          {member.firstName + " " + member.lastName}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>{member.email}</span>
        </div>

        <hr className="border-black" />

        <div className="flex flex-col font-sans font-bold">
          <span>YOUR GROUPS</span>
          <div className="flex flex-row flex-wrap gap-6 py-4 text-sm">
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
        <hr className="border-black" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex gap-x-12">
            <span>Receive Notifications before my events</span>
            <div className="form-check form-switch">
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchChecked"
                checked={
                  member.receiveNotPresentEmail
                    ? member.receiveNotPresentEmail
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
