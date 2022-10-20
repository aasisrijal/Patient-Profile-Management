export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err, res) => {
  const { statusCode = 500, message = "" } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
