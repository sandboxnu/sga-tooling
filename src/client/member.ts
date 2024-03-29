import { api } from "./login";

export const getMember = async (uuid: string) => {
  const response = await api.get("/member/getMember", {
    params: {
      id: uuid,
    },
  });

  return response.data.member;
};

export const getMemberTags = async (uuid: string) => {
  const reponse = await api.get("/member/getMemberTags", {
    params: {
      id: uuid,
    },
  });

  return reponse.data.memberTags;
};

export const updateMemberPreferences = async (uuid: string) => {
  const response = await api.get("/member/updateMemberPreferences", {
    params: {
      id: uuid,
    },
  });

  return response.data;
};
