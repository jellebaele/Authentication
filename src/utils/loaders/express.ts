import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const origin = {
  origin: '*',
};

const setupExpress = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(morgan('combined'));
  app.use(compression());
  app.use(cors(origin));
  app.use(helmet());

  return app;
};

export default setupExpress;
