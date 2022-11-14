import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

import { getToken, clear } from "./token";

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
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      try {
        const user:User = await jwt_decode(getToken("access_token")!);
        if (user && user.exp < Math.floor(Date.now()/1000)) {
          clear();
          window.location.href = "/login";
        }
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
