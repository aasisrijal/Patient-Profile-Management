import { Request } from "express";

export interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface TokenData {
  encryptedData: User;
  iat: number;
  exp: number;
}

export interface AuthInfoRequest extends Request {
  user: User;
}


export interface UserToken {
  id: Number;
  email: String;
}

export interface CustomRequest extends Request {
  user: UserToken;
}

export interface Patient {
  id: number;
  user_id: number;
  full_name: string;
  email: string;
  dob: string;
  contact: number;
  is_deleted: boolean;
  is_special: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}
