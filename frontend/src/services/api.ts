import toast from 'react-hot-toast';
import axios from 'axios';

import { getRequest, postRequest, deleteRequest, patchRequest } from "./axios";
import { storeToken, getToken } from "./token";

export const listPatients = async (page:number) => {
  try {
    const data  = await getRequest(`patients?page=${page}`);
    if (data.data.statusCode === 200){
      toast.success('Successfully fetched all patients!');
      return data.data.result;
    }
    
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (payload: any) => {
  try {
    const { data } = await postRequest("signin", payload);
    
    if(data.statusCode === 200) {
      storeToken(data.result);
    }
    return data;
    
  } catch (error) {
    toast.error('Failed to login!');
    console.log(error);
  }
};

export const signup = async (payload: any) => {
  try {
    const { data } = await postRequest("signup", payload);
    return data;
  } catch (error) {
    console.log(error);
    toast.error('Error occured!');
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

// upload image to cloudinary
export const uploadImage = async (data: any) => {
  try {
    const uploadUrl = "https://api.cloudinary.com/v1_1/dotjzw80a/image/upload";
    return await axios.post(uploadUrl, data);
  } catch (error) {
    console.log(error);
  }
};
