import dotenv from 'dotenv';
dotenv.config();

import { APP_PORT } from './config';
import setupServer from './utils/loaders';

const app = setupServer();

app?.listen(APP_PORT, () => {
  console.log(`Server is listening at http://localhost:${APP_PORT}`);
});
