import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "tw-elements";
import Switch from "../components/Switch";
import { AuthContext } from "../hooks/useAuth";

const UserPreference = (): ReactElement => {
  const [notPresentEmail, setNotPresentEmail] = useState<boolean>(false);
  const { member } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!member) {
    navigate("/");
  }

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
          {member?.firstName + " " + member?.lastName}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>{member?.email}</span>
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
              Diversity, Equity, and Inclusion
            </span>
          </div>
        </div>
        <hr className="border-black" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex gap-x-12">
            <span className="w-96">Receive Notifications before my events</span>
            <div>
              <Switch toggle={notPresentEmail} setToggle={setNotPresentEmail} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
