import axios, { AxiosError, AxiosResponse } from "axios";
import { Bounce, toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://snappfood.ir/mobile/v3",
});

const handleSuccessResponse = (response: AxiosResponse<unknown>): any => {
  // Handle successful responses, e.g., check for error codes in response data
  if (response.status === 200 || response.status === 201) {
    return Promise.resolve(response);
  }
};

const errorToast = (msg: string) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light",
    transition: Bounce,
  });
};

const handleErrorResponse = (error: AxiosError) => {
  const status = error?.response?.status;
  const message = error?.message;

  // Handle response errors, e.g., by showing error messages to the user
  switch (status) {
    case 401:
      errorToast(message);
      console.log(error, "401 Unauthorized");
      break;
    case 404:
      errorToast(message);

      console.log(error, "404 Not Found");
      break;
    case 500:
      errorToast(message);
      console.log(error, "500 Internal Server Error");
      break;
    default:
      errorToast(message);
      console.error("Unhandled error:", error);
  }

  return Promise.reject({ error, status });
};

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  handleSuccessResponse,
  handleErrorResponse
);

export default axiosInstance;
