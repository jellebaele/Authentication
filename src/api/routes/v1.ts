import { Router } from 'express';
import { asyncErrorHandler } from '../middleware';
import authRouter from './authRoute';
import userRouter from './userRoute';

const v1Router: Router = Router();

v1Router.use('/users', asyncErrorHandler(userRouter));
v1Router.use('/auth', authRouter);

export default v1Router;
