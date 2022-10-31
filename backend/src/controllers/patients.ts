import { Request, Response, NextFunction } from "express";

import * as patientService from "../services/patients";
import { successResponse } from "../utils/responseHelper";
import { AuthInfoRequest } from "../types";

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
    const patients = await patientService.createPatient(req.body);
    successResponse(res, patients, 201);
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
    successResponse(res, patients, 201);
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
