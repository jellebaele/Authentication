import { NextFunction, Request, RequestHandler, Response } from 'express';

export const internalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (!err.status) console.log(err.stack);

  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
};

export const asyncErrorHandler =
  (handler: RequestHandler) =>
  (...args: [Request, Response, NextFunction]) => {
    const next: NextFunction = args[2];

    return Promise.resolve(handler(...args)).catch(next);
  };
