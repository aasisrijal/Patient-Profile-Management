import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { getToken } from "../services/token";


type User = {
  [key: string]: any;
};

const checkValidToken = async() => {
  const access_token = getToken("access_token");
  if(access_token) {
    const user:User = await jwt_decode(access_token);
    if (user && user.exp < Math.floor(Date.now()/1000)) {
      console.log('token expired');
      // window.location.href = "/login";
      return false;
    }
    return true;
  }
  
  return false;
}

export const useAuthVerify = () => {
  const [verified, setVerified] = useState(true);

  const checkToken =async () => {
    const response = await checkValidToken();
    setVerified(response)
  }

  useEffect(()=> {
    checkToken();
  }, []);

  return verified;
};
