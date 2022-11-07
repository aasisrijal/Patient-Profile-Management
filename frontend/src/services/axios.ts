import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

import { storeToken, getToken, getRefreshToken } from "./token";

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
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${getToken(
        "access_token"
      )}` as unknown as AxiosHeaders;
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
    console.log('error in tokens')
    const user:User = await jwt_decode(getToken("access_token")!);
    console.log('user', user)
    if (user && user.exp < Math.floor(Date.now()/1000)) {
      console.log('token expired');
      window.location.href = "/login";
    }
    
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      try {
        const tokens = await postRequest("auth/refresh", {
          refreshToken: getRefreshToken(),
        });
        if (!tokens) {
          window.location.href = "/login";
        }
        storeToken(tokens.data);
      } catch (e) {
        window.location.href = "/login";
      }

    }
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
