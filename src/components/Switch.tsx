import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { queryClient } from "../App";
import { updateMemberPreferences } from "../client/member";
import { Member } from "../util/Types";

type SliderProp = {
  toggle: boolean;
  userID: string;
};

const Switch = ({ toggle, userID }: SliderProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // can just add the useMutation stuff here and pass it in as a prop
  const updateMemberPreference = useMutation({
    mutationFn: () => updateMemberPreferences(userID!),
    onMutate: async () => {
      // cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["api", "member", { userID }],
      });
      // previous state:
      const prevMember: Member | undefined = queryClient.getQueryData([
        "api",
        "member",
        { userID },
      ]);
      const newMemberData = {
        ...prevMember,
        receive_not_present_email: !prevMember?.receive_not_present_email,
      };
      // set New Values:
      queryClient.setQueryData(["api", "member", { userID }], newMemberData);
      return { prevMember };
    },
    onError: (err, newPreference, context) => {
      queryClient.setQueryData(
        ["api", "member", { userID }],
        context?.prevMember
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["api", "member", { userID }],
      });
    },
  });

  const setToggle = async () => {
    inputRef.current?.blur();

    updateMemberPreference.mutateAsync();
  };

  return (
    <div className="form-check form-switch">
      <input
        className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
        type="checkbox"
        role="switch"
        id="flexSwitchChecked"
        checked={toggle}
        onClick={setToggle}
      />
    </div>
  );
};

export default Switch;
