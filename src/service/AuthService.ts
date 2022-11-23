import { Request, Response } from 'express';
import { SESSION_NAME } from '../config';

export default class AuthService {
  login = (req: Request, userId: string) => {
    req.session.userId = userId;
  };

  logout = (req: Request, res: Response): Promise<Error | void> => {
    return new Promise((resolve, reject) => {
      req.session.destroy((err: Error) => {
        if (err) reject(err);

        res.clearCookie(SESSION_NAME);

        resolve();
      });
    });
  };

  static isLoggedIn = (req: Request): boolean => {
    return !!req.session.userId;
  };
}
