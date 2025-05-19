import { baseURL } from "@/utils/baseURL";
interface LoginPayload {
  email: string;
  password: string;
}
export const Login = async (path: string, payload: LoginPayload) => {
  const response = await baseURL.post(path, payload);
  console.log(response.data);

  return response;
};
