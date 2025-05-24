import * as AuthService from "@/service/authService";

// response type definition
interface Response {
  status: number;
  data: {
    title: string;
    data: string;
    message: string;
  };
}

export const SignIn = async (
  path: string,
  email: string,
  password: string
): Promise<Response> => {
  try {
    const response = await AuthService.Login(path, {
      email,
      password,
    });
    // return response.data and must meet all the types defined in Response
    return {
      status: response.status,
      data: {
        title: response.data?.title ?? "Login Successful",
        data: response.data?.data ?? "",
        message: response.data?.message ?? "",
      },
    };
  } catch (error) {
    // also takes the data type of Response
    return error as Response;
  }
};
