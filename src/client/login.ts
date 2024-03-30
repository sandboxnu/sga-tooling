import axios from "axios";

export const api = axios.create({
  baseURL: `https://sgatooling-hl1tv077r-sandboxneu.vercel.app/api`,
  headers: {
    "Content-Type": "application/json",
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
