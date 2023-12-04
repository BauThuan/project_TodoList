import customAxios from "./CustomAxios";
export const PostLoginService = (data) => {
  return customAxios.post("api/auth/local", data);
};
