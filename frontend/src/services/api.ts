import { getRequest, postRequest } from "./axios";
import { storeToken } from "./token";
import axios from 'axios'

export const listPatients = async () => {
  try {
    const { data } = await getRequest("patients");
    return data.result.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (payload: any) => {
  try {
    console.log('in login func')
    const { data } = await postRequest("signin", payload);
    console.log('login', data)
    storeToken(data);

    // Redirect to home page
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (payload: any) => {
  try {
    const { data } = await postRequest("signup", payload);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPatient = async (payload: any) => {
  try {
    const data = await postRequest("patients", payload);
    console.log("p created", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
