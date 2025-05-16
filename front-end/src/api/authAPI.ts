import * as AuthService from "@/service/authService";

export const SignIn = async (path: string, email: string, password: string) => {
  try {
    const response = await AuthService.Login(path, {
      email,
      password,
    });
    console.log(response.status);
    
    return response;
  } catch (error) {
    console.log(error);
  }
};
