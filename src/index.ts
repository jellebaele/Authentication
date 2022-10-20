import setupServer from './utils/loaders';

const app = setupServer();

const port = process.env.PORT || 3000;
app?.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
