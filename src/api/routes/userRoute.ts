import { Request, Response, Router } from 'express';
import UserController from '../../controller/UserController';
import { Roles } from '../../utils/enums/roles';
import {
  asyncErrorHandler,
  ensureAuthorized,
  ensureLoggedIn,
} from '../middleware';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get(
  '/me',
  ensureLoggedIn,
  asyncErrorHandler(
    async (req: Request, res: Response) =>
      await userController.getAllUsersHandler(req, res)
  )
);

userRouter.get(
  '/',
  ensureAuthorized(Roles.Admin),
  asyncErrorHandler(
    async (req: Request, res: Response) =>
      await userController.getAllUsersHandler(req, res)
  )
);

userRouter.get(
  '/:userId',
  ensureAuthorized(Roles.Admin),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.getUserByIdHandler(req, res);
  })
);

userRouter.put(
  '/:userId',
  ensureAuthorized(Roles.Admin),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.updateUserByIdHandler(req, res);
  })
);

userRouter.delete(
  '/:userId',
  ensureAuthorized(Roles.Admin),
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.deleteUserByIdHandler(req, res);
  })
);

export default userRouter;
