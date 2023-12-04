import axios from "axios";
const customAxios = axios.create({
  baseURL: "https://backoffice.nodemy.vn/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")} `,
  },
});

customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default customAxios;
