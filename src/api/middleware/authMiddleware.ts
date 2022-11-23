import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../../error/implementations/BadRequestError';
import UnauthorizedError from '../../error/implementations/UnauthorizedError';
import AuthService from '../../service/AuthService';

const authService = new AuthService();

export const ensureLoggedOut = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (authService.isLoggedIn(req)) {
    return next(new BadRequestError('You are already logged in.'));
  }
  return next();
};

export const ensureLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!authService.isLoggedIn(req)) {
    return next(new UnauthorizedError('You must be logged in.'));
  }
  return next();
};

export const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (authService.isLoggedIn(req) || !(await authService.isAuthorized(req))) {
    return next(new UnauthorizedError());
  }

  next();
};
