import axios from "axios";
import { Member, Response } from "../util/Types";

export default class MemberClient {
  /**
   * Gets the member with the associated nuid
   * @param nuid The nuid of the member
   * @returns The Member with that nuid or undefined
   */
  public static async fetchMember(id: string): Promise<Response<Member>> {
    const response = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/member/getMember/?id=${id}`
    );
    if (response.status === 200) {
      return {
        data: response.data.member,
        error: "",
      };
    } else {
      return {
        data: undefined,
        error: response.data,
      };
    }
  }
}
