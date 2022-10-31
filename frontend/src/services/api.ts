import { getRequest, postRequest, deleteRequest, patchRequest } from "./axios";
import { storeToken } from "./token";

export const listPatients = async () => {
  try {
    const { data } = await getRequest("patients");
    return data.result.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (payload: any) => {
  try {
    const { data } = await postRequest("signin", payload);
    storeToken(data.result);

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
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePatient = async (payload: any) => {
  try {
    const updateUrl = `patients/${payload.id}`;
    const data = await patchRequest(updateUrl, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePatient = async (payload: any) => {
  try {
    const deleteUrl = `patients/${payload}`;
    const data = await deleteRequest(deleteUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};
