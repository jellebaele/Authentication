import { NextFunction, Request, Response } from 'express';
import NotImplementedError from '../../error/implementations/NotImplementedError';
import { Roles } from '../../utils/enums/roles';

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

export const ensureAuthorized = (role: Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    next(new NotImplementedError());
  };
};
