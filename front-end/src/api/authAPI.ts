import * as AuthService from "@/service/authService";

// response type definition
interface LoginResponse {
  status: number;
  data: {
    data: string;
    message: string;
  };
  response: {
    data: {
      message: string;
    };
  };
}

export const SignIn = async (
  path: string,
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await AuthService.Login(path, {
      email,
      password,
    });
    console.log(response);
    // return response.data and must meet all the types defined in LoginResponse
    return {
      status: response.status,
      data: {
        data: response.data?.data ?? "",
        message: response.data?.message ?? "",
      },
      response: {
        data: {
          message: response.data?.message ?? "",
        },
      },
    };
  } catch (error) {
    console.log(error);
    // also takes the data type of LoginResponse
    return error as LoginResponse;
  }
};
