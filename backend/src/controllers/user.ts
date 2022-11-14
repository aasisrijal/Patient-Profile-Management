import { Request, Response, NextFunction } from "express";

import * as userService from "../services/users";
import { encryptPassword, comparePassword } from "../utils/password";
import { generateTokens } from "../utils/jwt";
import { successResponse } from "../utils/responseHelper";
import { ErrorHandler } from "../middlewares/errorHandler";

/**
 * Signup user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const userBody = { ...req.body };
    // check whether user exists or not
    const userExists = await userService.getUser(userBody.email)
    if (userExists.length > 0) {
      throw new ErrorHandler(400, "User already exists");
    }
    userBody.password = await encryptPassword(userBody.password);
    const newUser = await userService.createUser(userBody);
    successResponse(res, {}, 200, "User created successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * Login user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const userExist = await userService.getUser(req.body.email);
    if (userExist.length === 0) {
      throw new ErrorHandler(400, "User doesn't exist");
    }
    // compare passwords
    const validPwd = await comparePassword(
      req.body.password,
      userExist[0].password
    );
    if (!validPwd) {
      throw new ErrorHandler(400, "User Ccedentials doesn't match");
    }
    if (userExist && validPwd) {
      // generate token
      const tokens = generateTokens(userExist[0]);
      successResponse(res, tokens, 200);
    }
    // res.status(400).send("Invalid Credentials");
  } catch (err) {
    next(err);
  }
}

/**
 * Get all the users
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function allUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userService.fetchAll();
    res.status(200).json(users);
    successResponse(res, users, 200);
  } catch (err) {
    next(err);
  }
}
