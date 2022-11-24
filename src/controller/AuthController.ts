import { Request, Response } from 'express';
import BadRequestError from '../error/implementations/BadRequestError';
import UnauthorizedError from '../error/implementations/UnauthorizedError';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';
import TextUtils from '../utils/TextUtils';
import { loginSchema, registerSchema, validateSchema } from './validation';

class AuthController {
  userService: UserService;
  authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  public async registerUserHandler(req: Request, res: Response) {
    await validateSchema(registerSchema, req.body);
    const username = TextUtils.sanitize(req.body.username);
    const password = req.body.password;

    const found = await this.userService.getUserByUsername(username);
    if (found) {
      throw new BadRequestError('Invalid username');
    }

    const newUser = await this.userService.createUser({
      username,
      password,
    });

    this.authService.login(req, newUser.id);

    return res.status(201).json({ message: 'OK' });
  }

  public async loginUserHandler(req: Request, res: Response) {
    await validateSchema(loginSchema, req.body);
    const { username, password } = req.body;

    const user = await this.userService.getUserByUsername(username);

    if (!user || !(await user.matchesPassword(password))) {
      throw new UnauthorizedError('Invalid username or password');
    }

    this.authService.login(req, user._id);

    return res.status(200).json({ message: 'OK' });
  }

  public async logoutUserHandler(req: Request, res: Response) {
    await this.authService.logout(req, res);

    res.json({ message: 'OK' });
  }
}

export default AuthController;
