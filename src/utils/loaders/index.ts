import setupExpress from './express';
import { Express } from 'express';
import setupMongoose from './database';
import setupCacheStore from './cache';

const setupServer = (): Express | undefined => {
  try {
    setupMongoose();
    const cacheStore = setupCacheStore();
    const app = setupExpress(cacheStore);

    return app;
  } catch (error) {
    console.log('Something went wrong during setup server: ' + error);
  }
};

export default setupServer;
