import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../../error/implementations/BadRequestError';
import NotImplementedError from '../../error/implementations/NotImplementedError';
import UnauthorizedError from '../../error/implementations/UnauthorizedError';
import AuthService from '../../service/AuthService';
import { Roles } from '../../utils/enums/roles';

export const ensureLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (AuthService.isLoggedIn(req)) {
    return next(new BadRequestError('You are already logged in.'));
  }
  return next();
};

export const ensureLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!AuthService.isLoggedIn(req)) {
    return next(new UnauthorizedError('You must be logged in.'));
  }
  return next();
};

export const ensureAuthorized = (role: Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    next(new NotImplementedError());
  };
};
