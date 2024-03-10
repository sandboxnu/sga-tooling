import axios from "axios";

export const api = axios.create({
  // also may need to throw this in an env in the future...
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
    // weird this breaks it...
    //"Access-Control-Allow-Origin": "*",
  },
});

export const loginMember = async (nuid: string, last_name: string) => {
  const response = await api.get("/auth", {
    params: {
      id: nuid,
      password: last_name,
    },
  });
  return response.data;
};
