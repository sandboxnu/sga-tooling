import axios, { AxiosError } from "axios";
import { Member, Response } from "../util/Types";

export default class MemberClient {
  /**
   * Gets the member with the associated nuid
   * @param nuid The nuid of the member
   * @returns The Member with that nuid or undefined
   */
  public static async fetchMember(id: string): Promise<Response<Member>> {
    try {
      const response = await axios.get(`/api/member/getMember/?id=${id}`);
      return {
        data: response.data,
        error: "",
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        let error: AxiosError<any, any> = e;
        return {
          data: undefined,
          error: error.response?.data,
        };
      }
      throw e;
    }
  }
}
