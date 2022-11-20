const {
  MONGO_USERNAME = 'admin',
  MONGO_PASSWORD = 'secret',
  MONGO_HOST: MONGO_DOMAIN = 'localhost',
  MONGO_PORT = 27018,
  MONGO_DB = 'authentication',
} = process.env;

export const {
  MONGO_CONNECTION_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}/${MONGO_DB}`,
} = process.env;
