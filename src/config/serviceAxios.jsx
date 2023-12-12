import instance from "./customAxios";

export const PostLoginService = (data) => {
  return instance.post("/auth/local", data);
};

export const PostRegisterService = (data) => {
  return instance.post("/auth/local/register", data);
};

export const PostCreateTaskService = (data) => {
  return instance.post("/tasks", data);
};

export const PutUpdateTaskService = (id, data) => {
  return instance.put(`/tasks/${id}`, data);
};

export const DeleteTaskService = (id) => {
  return instance.delete(`/tasks/${id}`);
};
