import { baseURL } from "@/utils/baseURL";
import { AxiosRequestConfig } from "axios";
// AxiosRequestConfig cấu hình chuẩn của header, ? là đôi khi k cần truyền vào

/// api mẫu cho anh em hiểu luồng của dự án nhe
export const getPosts = async (path: string, config?: AxiosRequestConfig) => {
  const response = await baseURL.get(path, config);
  return response.data;
};
// data chỗ này chứa các dữ liệu của cái mới
export const createPosts = async (
  path: string,
  data: object,
  config?: AxiosRequestConfig
) => {
  const response = await baseURL.post(path, data, config);
  return response.data;
};
// data chỗ này chưa id hoặc username nếu với user và các thông tin cần thay đổi
export const updatePosts = async (
  path: string,
  data: object,
  config?: AxiosRequestConfig
) => {
  const response = await baseURL.post(path, data, config);
  return response.data;
};
// data chỗ này chứa id hoặc username để xóa, id được đưa vào body còn config sẽ là header
export const deletePosts = async (
  path: string,
  data: object,
  config?: AxiosRequestConfig
) => {
  const response = await baseURL.delete(path, {
    data,
    ...config,
  });
  return response.data;
};
// get by id mẫu truyền vào param
export const getPostById = async (
  path: string,
  id: number,
  config?: AxiosRequestConfig
) => {
  const response = await baseURL.get(`${path}/${id}`, config);
  return response.data;
};

// get by id truyền vào body còn config sẽ là header
export const getPostByIdBody = async (
  path: string,
  id: number,
  config?: AxiosRequestConfig
) => {
  const response = await baseURL.get(path, {
    params: { id },
    ...config,
  });
  return response.data;
};
