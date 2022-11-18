import { Request, Response } from 'express';
import NotFoundError from '../error/implementations/NotFoundError';
import UserService from '../service/UserService';

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsersHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.send(users);
  }

  public async getUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);

    return res.send(user);
  }

  public async updateUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.params;
    const { username, password, isAdmin } = req.body;

    const found = this.userService.getUserById(userId);
    if (!found) {
      throw new NotFoundError();
    }

    const updatedUser = await this.userService.updateUserById(
      userId,
      { username, password, isAdmin },
      { lean: true }
    );

    return res.send(updatedUser);
  }

  public async deleteUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.params;

    const found = await this.userService.getUserById(userId);
    if (!found) {
      throw new NotFoundError();
    }

    await this.userService.deleteUserById(userId);
    return res.status(204).send();
  }
}

export default UserController;
