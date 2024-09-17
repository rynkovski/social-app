import Axios from "axios";
import { getCookie } from "cookies-next";

const api = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    console.error("Error", error);
    return Promise.reject(error);
  }
);
api.interceptors.request.use(function (config) {
  const token = getCookie("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
