import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

import { storeToken, getToken, getRefreshToken } from "./token";

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

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      window.location.href = "/login";
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

      // redirect to login when access token expires
    }
    // window.location.href = "/login";
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
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL: string) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
