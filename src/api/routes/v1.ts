import { Router } from 'express';
import userRouter from './userRoute';

const v1Router: Router = Router();

v1Router.use('/users', userRouter);

export default v1Router;
