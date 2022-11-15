import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

import { getAccessToken, clear, setAccessToken, getRefreshToken } from "./token";

const baseUrl:string = process.env.REACT_APP_BASE_URL!;

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (config.headers && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}` as unknown as AxiosHeaders;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type User = {
  [key: string]: any;
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => { 
    const originalConfig = error.config;   
    if (originalConfig.url !== "/api/signin" && error.response) {
    if (
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        const user:User = await jwt_decode(getRefreshToken()!);
        if (user && user.exp < Math.floor(Date.now()/1000)) {
          clear();
          window.location.href = "/login";
        } else {
          const tokens = await axiosClient.post("auth/refresh", {
            refreshToken: getRefreshToken(),
          });
          setAccessToken(tokens.data.result.accessToken);
          return axiosClient(originalConfig.url);
        }
      } catch (e) {
        return Promise.reject(e);
      }

    }}
    return error.response
  }
);

export default axiosClient;

export async function getRequest(URL: string) {
  const response = await axiosClient.get(`/${URL}`);
  return response;
}

export async function postRequest(URL: string, payload: any) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}

export async function patchRequest(URL: string, payload: any) {
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL: string) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
