import { Request, Response } from 'express';
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
    try {
      const users = await this.userService.getAllUsers();
      return res.send(users);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ error: error.message });
      return res.status(400).send(error);
    }
  }

  public async getUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.params.userId;

    try {
      const user = await this.userService.getUserById(userId);

      return res.send(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ error: error.message });
      return res.status(400).send(error);
    }
  }

  public async updateUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = req.params.userId;
    const { username, password, isAdmin } = req.body;

    try {
      const updatedUser = await this.userService.updateUserById(
        id,
        { username, password, isAdmin },
        { lean: true }
      );

      return res.send(updatedUser);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ error: error.message });
      return res.status(400).send({ error });
    }
  }

  public async deleteUserByIdHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = req.params.userId;

    try {
      await this.userService.deleteUserById(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ error: error.message });
      return res.status(400).send({ error });
    }
  }
}

export default UserController;
