import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://muvment-dev-api.up.railway.app/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.message === "Network Error") {
      console.log(error);
      return toast.error(error.response?.message);
    }

    if (error.response?.status === 500)
      toast.error(error.response?.data?.message);
    
    return Promise.reject(error);
  }
);
