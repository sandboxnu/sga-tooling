import { api } from "./client";

export const loginMember = async (nuid: string, last_name: string) => {
  const response = await api.get("/auth", {
    params: {
      id: nuid,
      password: last_name,
    },
  });
  return response.data;
};

export const getMember = async (uuid: string) => {
  const response = await api.get("/member/getMember", {
    params: {
      id: uuid,
    },
  });

  return response.data;
};

// TODO: getMemberTags, updateMemberPreferences
