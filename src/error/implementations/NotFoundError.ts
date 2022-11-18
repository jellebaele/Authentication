import HttpError from '../HttpError';

export default class NotFoundError extends HttpError {
  constructor(message = 'Cannot find the requested resource') {
    super(message);

    this.status = 404;
  }
}
