import { Request, Response } from 'express';
import { JWT_EXPIRATION, JWT_SECRET, SESSION_NAME } from '../config';
import { IUserDto } from '../model/User';
import UserService from './UserService';
import jwt from 'jsonwebtoken';
import { UserStatus } from '../utils/enums';

export default class AuthService {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (user: IUserDto) => {
    const token = jwt.sign(
      {
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    const newUser = await this.userService.createUser({
      ...user,
      confirmationCode: token,
    });

    return newUser;
  };

  verifyConfirmationCode = (confirmationCode: string): boolean => {
    try {
      jwt.verify(confirmationCode, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  };

  login = (req: Request, userId: string) => {
    req.session.userId = userId;
    req.session.createdAt = Date.now();
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

  isUserActive = (user: IUserDto): boolean => {
    return Number(user.status) === UserStatus.Active;
  };

  isLoggedIn = (req: Request): boolean => {
    return !!req.session.userId;
  };

  isAuthorized = async (req: Request): Promise<boolean> => {
    if (!this.isLoggedIn(req)) return false;
    const userId = req.session?.userId;
    const user = await this.userService.getUserById(userId as string);

    return user === null ? false : user.isAdmin;
  };
}
