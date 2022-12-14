import { Request, Response, NextFunction } from "express";

import * as authService from "../services/auth";
import { successResponse } from "../utils/responseHelper";

/**
 * Refresh access token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    const data = await authService.refreshToken(refreshToken);
    successResponse(res, data, 200);
  } catch (err) {
    next(err);
  }
}

/**
 * Update Refresh token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export async function updateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;
    const data = {};

    res.send(data);
  } catch (err) {
    next(err);
  }
}
