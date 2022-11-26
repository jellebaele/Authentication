const SIX_HOURS = 1000 * 60 * 60 * 6;

export const { JWT_SECRET = 'jwtsecret', JWT_EXPIRATION = SIX_HOURS } =
  process.env;

export const BCRYPT_WORK_FACTOR = 13;
export const BCRYPT_MAXIMUM_BYTES = 72;
