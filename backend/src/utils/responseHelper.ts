import { Response } from "express";

export const successResponse = (
  res: Response,
  result = {},
  statusCode = 200,
  message = ""
) => {
  return res.json({
    result,
    statusCode,
    message,
  });
};
