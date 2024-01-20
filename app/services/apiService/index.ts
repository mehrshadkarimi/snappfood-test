import { Axios, AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type TApiMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

type TApiServiceResult = {
  isSuccess: boolean;
  isError: boolean;
  error?: any;
  data?: unknown;
};

const apiService = async (
  method: TApiMethod,
  url: string,
  payload?: unknown,
  params?: unknown
): Promise<TApiServiceResult> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance({
      method,
      url,
      data: payload,
      params,
    });

    return {
      isSuccess: response.data !== undefined,
      data: response?.data,
      isError: false,
    };
  } catch ({ error, status }: any) {
    return {
      isSuccess: false,
      isError: true,
      error: error?.message,
    };
  }
};

export default apiService;
