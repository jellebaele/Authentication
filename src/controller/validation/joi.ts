import { ObjectSchema } from 'joi';
import BadRequestError from '../../error/implementations/BadRequestError';

export const validateSchema = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (error: any) {
    throw new BadRequestError(error);
  }
};
