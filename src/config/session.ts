import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';

const ONE_HOUR = 1000 * 60 * 60;
const HALF_HOUR = ONE_HOUR / 2;

export const {
  SESSION_SECRET = 'keyboard cat',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_ABSOLUTE_TIMEOUT = +(
  process.env.SESSION_ABSOLUTE_TIMEOUT || ONE_HOUR
);

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: +HALF_HOUR,
    secure: IN_PROD,
    httpOnly: true,
    sameSite: true,
  },
};
