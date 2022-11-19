import { Request, Response } from 'express';
import BadRequestError from '../error/implementations/BadRequestError';
import UnauthorizedError from '../error/implementations/UnauthorizedError';
import UserService from '../service/UserService';
import TextUtils from '../utils/TextUtils';
import { loginSchema, registerSchema, validateSchema } from './validation';

class AuthController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async registerUserHandler(req: Request, res: Response) {
    await validateSchema(registerSchema, req.body);
    const username = TextUtils.sanitize(req.body.username);
    const password = req.body.password;

    const found = await this.userService.getUserByUsername(username);
    if (found) {
      throw new BadRequestError('Invalid username');
    }

    await this.userService.createUser({
      username,
      password,
    });

    // Login user

    return res.status(201).json({ message: 'OK' });
  }

  public async loginUserHandler(req: Request, res: Response) {
    await validateSchema(loginSchema, req.body);
    const { username, password } = req.body;

    const user = await this.userService.getUserByUsername(username);

    if (!user || (await user.validatePassword(password))) {
      throw new UnauthorizedError('Invalid username or password');
    }

    // login user
    // authService.login(userid);

    return res.status(200).json({ message: 'OK' });
  }
}

export default AuthController;
