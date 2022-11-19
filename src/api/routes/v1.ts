import { Router } from 'express';
import authRouter from './authRoute';
import userRouter from './userRoute';

const v1Router: Router = Router();

v1Router.use('/users', userRouter);
v1Router.use('/auth', authRouter);

export default v1Router;
