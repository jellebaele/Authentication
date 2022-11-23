import connectRedis, { RedisStore } from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import { REDIS_OPTIONS } from '../../config';

function setupCacheStore(): RedisStore {
  const redisClient = new Redis({
    ...REDIS_OPTIONS,
  });

  const RedisStore = connectRedis(session);
  const store = new RedisStore({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: redisClient as any,
  });

  console.log('Connected to redis cache.');

  return store;
}

export default setupCacheStore;
