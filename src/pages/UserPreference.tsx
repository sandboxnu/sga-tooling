import { useQuery } from "@tanstack/react-query";
import { ReactElement, useContext } from "react";
import "tw-elements";
import { LoginContext } from "../App";
import { getMember, getMemberTags } from "../client/member";
import EventTag from "../components/EventTag";
import Loading from "../components/Loading";
import { Member, MembershipGroupTags } from "../util/Types";
// import { queryClient } from "../App"

const UserPreference = (): ReactElement => {
  const { userID } = useContext(LoginContext);

  // fetch the member
  const {
    data: memberData,
    isLoading: memberLoading,
    isError: memberError,
  } = useQuery<Member>({
    queryFn: () => getMember(userID!),
    queryKey: ["api", "member", { userID }],
  });

  console.log(memberData);
  // fetch their respective tags
  const {
    data: memberTags,
    isLoading: memberTagsLoading,
    isError: memberTagsError,
  } = useQuery<MembershipGroupTags[]>({
    queryFn: () => getMemberTags(userID!),
    queryKey: ["api", "memberTag", { userID }],
  });

  console.log(memberTags);

  if (memberLoading || memberTagsLoading) {
    return <Loading />;
  }

  // use the useMutation with optimistic loading:
  const tagElements: ReactElement[] = memberTags
    ? memberTags.map((item) => {
        return <EventTag tag={item.membership_group} />;
      })
    : [];

  // Switch -> initialState -> member.

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
          {memberData?.first_name + " " + memberData?.last_name}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Email</span>
          <span>{memberData?.email}</span>
        </div>

        <hr className="border-black" />

        <div className="flex flex-col font-sans font-bold">
          <span>YOUR GROUPS</span>
          {/* TODO: if they are not in any groups, give them text to show that*/}
          <div className="flex flex-row flex-wrap gap-6 py-4 text-sm">
            {tagElements}
          </div>
        </div>
        <hr className="border-black" />

        <div className="flex flex-col gap-y-6">
          <span className="font-bold"> PREFERENCES </span>
          <div className="flex md:w-1/2 w-full justify-between">
            <span>Receive Notifications before my events</span>
            <div>
              {/* <Switch toggle={memberData?.receive_not_present_email} setToggle={setNotPresentEmail} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreference;
