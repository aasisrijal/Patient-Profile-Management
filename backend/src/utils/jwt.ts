import * as jwt from "jsonwebtoken";
import { ErrorHandler } from "../middlewares/errorHandler";

import { User, TokenData } from "../types";

/**
 * Generate access and refresh tokens.
 *
 * @param {User} data
 */
export function generateTokens(data: User) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data),
  };
}

/**
 * Generate access token.
 *
 * @param {User} data
 * @returns {string}
 */
export function generateAccessToken(data: User) {
  return jwt.sign(
    {
      encryptedData: {
        id: data.id,
        email: data.email
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_DURATION,
    }
  );
}

/**
 * Generate refresh token.
 *
 * @param {User} data
 * @returns {string}
 */
export function generateRefreshToken(data: User) {
  return jwt.sign(
    {
      encryptedData: data,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_DURATION,
    }
  );
}

/**
 * Verify access token.
 *
 * @param {string} token
 */
export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenData;
  }catch(error){
    throw new ErrorHandler(401, "invalid token");
  }
}

/**
 * Verify refresh token.
 *
 * @param {string} token
 */
export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as TokenData;
  }catch(error){
    throw new ErrorHandler(401, "invalid token");
  }
}
