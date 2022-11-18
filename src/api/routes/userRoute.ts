import { Request, Response, Router } from 'express';
import UserController from '../../controller/UserController';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get('/', (req: Request, res: Response) =>
  userController.getAllUsersHandler(req, res)
);

userRouter.get('/:userId', (req: Request, res: Response) => {
  userController.getUserByIdHandler(req, res);
});

userRouter.put('/:userId', (req: Request, res: Response) => {
  userController.updateUserByIdHandler(req, res);
});

userRouter.delete('/:userId', (req: Request, res: Response) => {
  userController.deleteUserByIdHandler(req, res);
});

export default userRouter;
