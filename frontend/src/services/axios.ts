import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

import { storeToken, getAccessToken, getRefreshToken } from "./token";

const baseUrl = "http://localhost:3000/api";

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
      config.headers["Authorization"] = `Bearer ${getAccessToken(
      )}` as unknown as AxiosHeaders;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      // window.location.href = '/';
      const tokens = await postRequest("auth/refresh", {
        refreshToken: getRefreshToken()
      });
      // redirect to login when access token expires
      if (!tokens) {
        window.location.href = "/login";
      }
      storeToken(tokens.data);
    }
    window.location.href = "/login";
  }
);

export async function getRequest(URL: string) {
  const response = await axiosClient.get(`/${URL}`);
  return response;
}

export async function postRequest(URL: string, payload: any) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}

export async function patchRequest(URL: string, payload: any) {
  const response = await axiosClient.patch(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL: string) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
