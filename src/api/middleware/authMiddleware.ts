import { NextFunction, Request, Response } from 'express';
import NotImplementedError from '../../error/implementations/NotImplementedError';

export const ensureLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError());
};

export const ensureLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotImplementedError());
};
