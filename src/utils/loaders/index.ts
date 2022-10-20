import setupExpress from './express';
import { Express } from 'express';
import dotenv from 'dotenv';

const setupServer = (): Express | undefined => {
  try {
    dotenv.config();
    const app = setupExpress();

    return app;
  } catch (error) {
    console.log('Somenthing went wrong during setup server: ' + error);
  }
};

export default setupServer;
