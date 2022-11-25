import Joi from 'joi';

const email = Joi.string().email().lowercase().trim().required();
const username = Joi.string().min(3).max(128).trim().required();
const password = Joi.string()
  .min(8)
  .max(58)
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/u)
  .message(
    '"{#label}" must contain at least one uppercase, one lowercase one digit and one special character ("?=.*?[#?!@$%^&*-]").'
  )
  .required();
const passwordConfirmation = Joi.valid(Joi.ref('password')).required();

export const registerSchema = Joi.object({
  email,
  username,
  password,
  passwordConfirmation,
});

export const loginSchema = Joi.object({
  username,
  password,
});
