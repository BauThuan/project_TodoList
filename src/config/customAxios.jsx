import axios from "axios";

const instance = axios.create({
  baseURL: "https://backoffice.nodemy.vn/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export default instance;
