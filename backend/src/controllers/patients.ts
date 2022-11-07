import { Request, Response, NextFunction } from "express";

import * as patientService from "../services/patients";
import { successResponse } from "../utils/responseHelper";
import { AuthInfoRequest } from "../types";
import { ErrorHandler } from "../middlewares/errorHandler";

/**
 * Get all the patients
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function allPatients(
  req: AuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.user;
    const patients = await patientService.fetchAll(id);
    successResponse(res, patients, 200);
  } catch (err) {
    next(err);
  }
}

/**
 * Create new patients
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function create(
  req: AuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.user;
    req.body.user_id = id; 
    // check whether patient exists or not
    const patientExists = await patientService.getPatient(req.body.email);
    if (patientExists.length > 0) {
      // throw new ErrorHandler(400, "Patient already exists");
      res.status(400).send({message:"Patient already exists"})
    }
    const patients = await patientService.createPatient(req.body);
    successResponse(res, patients, 201, "Patient created successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * Update a patient
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function updatePatient(
  req: AuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updatedBody = req.body;
    const patients = await patientService.updatePatient(id, updatedBody);
    successResponse(res, patients, 201, "Pateint updated successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a patient
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function deletePatient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const patients = await patientService.removePatient(id);
    successResponse(res, {}, 200, "Patient deleted successuflly");
  } catch (err) {
    next(err);
  }
}
