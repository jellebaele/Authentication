import { NextFunction, Request, Response } from 'express';
import { SESSION_ABSOLUTE_TIMEOUT } from '../../config';
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
  const isAuthorized = await authService.isAuthorized(req);

  if (!isAuthorized) return next(new UnauthorizedError());

  next();
};

export const checkTimeLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (authService.isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;

    if (!createdAt || now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await authService.logout(req, res);
      return next(new UnauthorizedError('Session expired'));
    }
  }

  next();
};
