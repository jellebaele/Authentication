import { Request, Response, Router } from 'express';
import UserController from '../../controller/UserController';
import UserService from '../../service/implementations/UserService';

const userRouter: Router = Router();
const userController = new UserController(new UserService());

userRouter.get('/', (req: Request, res: Response) =>
  userController.getAllUsersHandler(req, res)
);

userRouter.get('/:userId', (req: Request, res: Response) => {
  userController.getUserByIdHandler(req, res);
});

userRouter.post('/', (req: Request, res: Response) =>
  userController.createUserHandler(req, res)
);

userRouter.put('/:userId', (req: Request, res: Response) => {
  userController.updateUserByIdHandler(req, res);
});

userRouter.delete('/:userId', (req: Request, res: Response) => {
  userController.deleteUserByIdHandler(req, res);
});

export default userRouter;
