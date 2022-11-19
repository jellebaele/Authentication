import { Request, Response, Router } from 'express';
import AuthController from '../../controller/AuthController';
import { asyncErrorHandler } from '../middleware';
import { ensureLoggedOut } from '../middleware/authMiddleware';

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post(
  '/register',
  ensureLoggedOut,
  asyncErrorHandler(async (req: Request, res: Response) => {
    await authController.registerUserHandler(req, res);
  })
);

authRouter.post(
  '/login',
  ensureLoggedOut,
  asyncErrorHandler(async (req: Request, res: Response) => {
    await authController.loginUserHandler(req, res);
  })
);

export default authRouter;
