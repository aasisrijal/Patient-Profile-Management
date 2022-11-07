import { Response, NextFunction, Request } from "express";

import * as tokens from "../utils/jwt";
import { ErrorHandler } from "./errorHandler";
import { UserToken, CustomRequest } from "../types"

const BEARER = "Bearer";

/**
 * Middleware to validate access token present in the header.
 *
 * @param {Request} req
 * @param {Response}res
 * @param {Next} next
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!("authorization" in req.headers)) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const authString = req.headers.authorization as string;

    if (!authString.startsWith(BEARER)) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const accessToken = authString.substring(BEARER.length).trim();

    (req as CustomRequest).user =
      tokens.verifyAccessToken(accessToken).encryptedData;

    next();
  } catch (err) {
    next(err);
  }
}
