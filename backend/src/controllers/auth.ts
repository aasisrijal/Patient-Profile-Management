
import { Request, Response, NextFunction } from 'express';
/**
 * Login user with Microsoft.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 export async function welcome(req: Request, res: Response, next: NextFunction) {
    try {
  
      res.status(200).json({'message': "Welcome to the patient management101"});
    } catch (err) {
      next(err);
    }
  }
  