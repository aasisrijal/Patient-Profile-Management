import * as jwt from "jsonwebtoken";

import { User, TokenData } from "../types";

/**
 * Generate access and refresh tokens.
 *
 * @param {any} data
 */
export function generateTokens(data: any) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data),
  };
}

/**
 * Generate access token.
 *
 * @param {any} data
 * @returns {string}
 */
export function generateAccessToken(data: any) {
  return jwt.sign(
    {
      encryptedData: data,
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
 * @param {any} data
 * @returns {string}
 */
export function generateRefreshToken(data: any) {
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
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenData;
}

/**
 * Verify refresh token.
 *
 * @param {string} token
 */
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as TokenData;
}
