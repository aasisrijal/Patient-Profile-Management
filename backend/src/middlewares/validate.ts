import { validationResult } from 'express-validator';

import { successResponse } from "../utils/responseHelper";

export const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            status: "error",
            errors: [...errors.array()]
        });
        // successResponse(res, {errors: errors.array()}, 400);
    };
};