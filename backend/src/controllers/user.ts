import { Request, Response, NextFunction } from "express";

import * as userService from "../services/users";
import { encryptPassword, comparePassword } from "../utils/password";
import { generateTokens } from "../utils/jwt";

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
    userBody.password = await encryptPassword(userBody.password);
    const newUser = userService.createUser(userBody);
    res.status(201).json({ newUser });
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
    // compare passwords
    const validPwd = await comparePassword(
      req.body.password,
      userExist[0].password
    );
    if (userExist && validPwd) {
      // generate token
      const tokens = generateTokens(userExist);
      return res.status(200).json(tokens);
    }
    res.status(400).send("Invalid Credentials");
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
  } catch (err) {
    next(err);
  }
}
