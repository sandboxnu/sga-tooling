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

export const getMemberTags = async (uuid: string) => {
  const reponse = await api.get("/member/getMemberTags", {
    params: {
      id: uuid,
    },
  });

  return reponse.data;
};

// this is an interesting one, this is an update, feels like a put, but there is no need to pass data
// so this is a get, just a note
export const updateMemberTags = async (uuid: string) => {
  const response = await api.get("/member/updateMemberPreferences", {
    params: {
      id: uuid,
    },
  });

  return response.data;
};
