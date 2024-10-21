import axios from "axios";

// NOTE: our local backend blocks put/post requests, which is annoying for creating real
// attendance changes, as a quick work-around I used a url of the most recently depoyed
// backend (I know not ideal)
export const api = axios.create({
  baseURL: `https://sgatooling-7y9kdz96i-sandboxneu.vercel.app/api`,
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
