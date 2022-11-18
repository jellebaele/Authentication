import HttpError from '../HttpError';

export default class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message);

    this.status = 401;
  }
}
