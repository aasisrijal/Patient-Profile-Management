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
