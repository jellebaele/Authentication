import { Request, Response } from 'express';
import { mailTransporter } from '../config';
import BadRequestError from '../error/implementations/BadRequestError';
import UnauthorizedError from '../error/implementations/UnauthorizedError';
import AuthService from '../service/AuthService';
import MailService from '../service/MailService';
import UserService from '../service/UserService';
import { UserStatus } from '../utils/enums';
import { createBodyConfirmRegistration } from '../utils/mail/userRegistration';
import TextUtils from '../utils/TextUtils';
import { loginSchema, registerSchema, validateSchema } from './validation';

class AuthController {
  userService: UserService;
  authService: AuthService;
  mailService: MailService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
    this.mailService = new MailService(mailTransporter);
  }

  public async registerUserHandler(req: Request, res: Response) {
    await validateSchema(registerSchema, req.body);
    const username = TextUtils.sanitize(req.body.username);
    const email = TextUtils.sanitize(req.body.email);
    const password = req.body.password;

    const found = await this.userService.getUserByMailOrUsername(
      username,
      email
    );

    if (found) {
      throw new BadRequestError('Invalid username or email');
    }

    const newUser = await this.authService.register({
      username,
      email,
      password,
    });

    this.mailService.sendMail({
      sourceAdress: 'authExample@test.com',
      destinationAdress: newUser.email,
      subject: 'Email confirmation',
      body: createBodyConfirmRegistration(newUser),
    });

    return res.status(201).json({ message: 'OK' });
  }

  public async loginUserHandler(req: Request, res: Response) {
    await validateSchema(loginSchema, req.body);
    const { username, password } = req.body;

    const user = await this.userService.getUserByUsername(username);

    if (!user || !(await user.matchesPassword(password))) {
      throw new UnauthorizedError('Invalid username or password');
    }

    if (!this.authService.isUserActive(user)) {
      throw new UnauthorizedError('Invalid account. Please verify your email');
    }

    this.authService.login(req, user._id);

    return res.status(200).json({ message: 'OK' });
  }

  public async logoutUserHandler(req: Request, res: Response) {
    await this.authService.logout(req, res);

    res.json({ message: 'OK' });
  }

  public async confirmRegistrationHandler(req: Request, res: Response) {
    const { confirmationCode } = req.params;

    if (!confirmationCode) return new BadRequestError();

    const user = await this.userService.getUserByConfirmationCode(
      confirmationCode
    );

    if (!user) throw new UnauthorizedError();
    if (this.authService.isUserActive(user)) {
      throw new BadRequestError('Already active');
    }

    const valid = this.authService.verifyConfirmationCode(confirmationCode);
    if (!valid) throw new UnauthorizedError();

    this.userService.updateUserById(user.id, { status: UserStatus.Active });

    res.json({ message: 'OK' });
  }
}

export default AuthController;
