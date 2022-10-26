import setupExpress from './express';
import { Express } from 'express';
import dotenv from 'dotenv';
import setupMongoose from './mongo';

const setupServer = (): Express | undefined => {
  try {
    dotenv.config();
    const app = setupExpress();
    setupMongoose();

    return app;
  } catch (error) {
    console.log('Something went wrong during setup server: ' + error);
  }
};

export default setupServer;
