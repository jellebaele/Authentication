import { Request, Response } from 'express';
import { SESSION_NAME } from '../config';
import UserService from './UserService';

export default class AuthService {
  userService;

  constructor() {
    this.userService = new UserService();
  }

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

  isLoggedIn = (req: Request): boolean => {
    return !!req.session.userId;
  };

  isAuthorized = async (req: Request): Promise<boolean> => {
    if (!this.isLoggedIn(req)) return false;
    const userId = req.session?.userId;
    const user = await this.userService.getUserById(userId as string);

    console.log('IsAuth');
    console.log(user);
    console.log(user === null ? false : user.isAdmin);

    return user === null ? false : user.isAdmin;
  };
}
