import { Request, Response, Router } from 'express';
import UserController from '../../controller/UserController';
import {
  asyncErrorHandler,
  ensureIsAdmin,
  ensureLoggedIn,
} from '../middleware';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get(
  '/me',
  ensureLoggedIn,
  asyncErrorHandler(
    async (req: Request, res: Response) =>
      await userController.getCurrentUserHandler(req, res)
  )
);

userRouter.get(
  '/',
  ensureIsAdmin,
  asyncErrorHandler(
    async (req: Request, res: Response) =>
      await userController.getAllUsersHandler(req, res)
  )
);

userRouter.get(
  '/:userId',
  ensureIsAdmin,
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.getUserByIdHandler(req, res);
  })
);

userRouter.put(
  '/:userId',
  ensureIsAdmin,
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.updateUserByIdHandler(req, res);
  })
);

userRouter.delete(
  '/:userId',
  ensureIsAdmin,
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.deleteUserByIdHandler(req, res);
  })
);

export default userRouter;
