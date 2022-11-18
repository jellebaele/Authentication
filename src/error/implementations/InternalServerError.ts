import HttpError from '../HttpError';

export default class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(message);

    this.status = 500;
  }
}
