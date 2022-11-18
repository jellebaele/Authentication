import { Request, Response } from 'express';
import BadRequestError from '../error/implementations/BadRequestError';
import UnauthorizedError from '../error/implementations/UnauthorizedError';
import UserService from '../service/UserService';
import { loginSchema, registerSchema, validateSchema } from './validation';

class AuthController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async registerUserHandler(req: Request, res: Response) {
    await validateSchema(registerSchema, req.body);
    const { username, password } = req.body;

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

    if (!user || (await this.userService.validatePassword(password, user.id))) {
      throw new UnauthorizedError('Invalid username or password');
    }

    // login user
    // authService.login(userid);
  }
}

export default AuthController;
