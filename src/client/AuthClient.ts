import axios from "axios";
import { AuthResponse, Response } from "../util/Types";

class AuthClient {
  public static async login(
    nuid: string,
    lastName: string
  ): Promise<Response<AuthResponse>> {
    // Call the login API
    const response = await axios.post(`/api/auth`, {
      nuid,
      lastName,
    });
    return {
      data: response.data.auth,
      error: response.data.error,
      status: response.status,
    };
  }
}

export default AuthClient;
