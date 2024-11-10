import axios, { AxiosError } from "axios";
import { AuthResponse, Response } from "../util/Types";

class AuthClient {
  public static async login(
    nuid: string,
    lastName: string
  ): Promise<Response<AuthResponse>> {
    // Call the login API
    try {
      const response = await axios.post(`/api/auth`, {
        nuid,
        lastName,
      });
      return {
        data: response.data.auth,
        error: response?.data.error,
        status: response.status,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        let error: AxiosError<any, any> = e;
        return {
          data: undefined,
          error: error.response?.data.error,
          status: error.response?.status,
        };
      }
      throw e;
    }
  }
}

export default AuthClient;
