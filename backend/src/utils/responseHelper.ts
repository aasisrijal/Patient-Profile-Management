import { Response } from "express";

export const successResponse = (
  res: Response,
  result = {},
  code = 200,
  message = ""
) => {
  return res.json({
    result,
    code,
    message,
  });
};
