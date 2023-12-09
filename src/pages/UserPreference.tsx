import { ReactElement, useContext, useEffect, useState } from "react";
import "tw-elements";
import { LoginContext } from "../App";
import { getMember, getMemberTags } from "../client/member";
import Loading from "../components/Loading";
import Switch from "../components/Switch";
import { TagButtonStyles } from "../util/styleConfig";
import { Member, MembershipGroupTags, SGATags } from "../util/Types";

const UserPreference = (): ReactElement => {
  const [member, setMember] = useState<Member>();
  const [memberTags, setMemberTags] = useState<SGATags[]>();
  const [notPresentEmail, setNotPresentEmail] = useState<boolean>(false);
  const { userID } = useContext(LoginContext);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // TODO: if this is slow I'll attach the tags to the member;
        const responseData = await getMember(userID!);
        const member = responseData.member;
        const memershipData = await getMemberTags(userID!);
        const tags: MembershipGroupTags[] = memershipData.memberTags;
        const sgaTags = tags.map((tag) => tag.membership_group);

        setMember(member);
        setMemberTags(sgaTags);

        setNotPresentEmail(member.receive_not_present_email);
      } catch (err) {
        // TODO error handling;
      }
    };

    fetchMember();
  }, [userID]);

  if (!member) {
    return <Loading />;
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
          {member.first_name + " " + member.last_name}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>{member.email}</span>
        </div>

        <hr className="border-black" />

        <div className="flex flex-col font-sans font-bold">
          <span>YOUR GROUPS</span>
          <div className="flex flex-row flex-wrap gap-6 py-4 text-sm">
            {memberTags?.map((element) => {
              const text = TagButtonStyles[element].text;
              const styles = TagButtonStyles[element].className;
              return <div className={styles}>{text}</div>;
            })}
          </div>
        </div>

        <hr className="border-black" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex md:w-1/2 w-full justify-between">
            <span className="">Receive Notifications before my events</span>
            <div>
              <Switch toggle={notPresentEmail} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
