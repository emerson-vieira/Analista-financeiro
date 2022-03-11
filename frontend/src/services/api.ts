import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://backend:8080",
});


const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const API = {
  get<T>(endpoint: string, params?: any): Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(endpoint, { params });
  },

  post<T>(
    endpoint: string, payload: any, config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T | any>> {
    return axiosInstance.post(endpoint, payload, {
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers,
      },
      ...config,
    });
  },
  delete(endpoint: string): Promise<AxiosResponse<any>> {
    return axiosInstance.delete(endpoint);
  },

  put(endpoint: string, payload: any, config?: AxiosRequestConfig,): Promise<AxiosResponse<any>> {
    return axiosInstance.put(endpoint, payload, {
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers,
      },
    });
  },

  all(requests: any[]): Promise<any[]> {
    return Promise.all(requests);
  },

  patch<T = any, R = AxiosResponse<T>>(
    endpoint: string,
    payload: any,
  ): Promise<R> {
    return axiosInstance.patch(endpoint, payload);
  },
};

export default API;
