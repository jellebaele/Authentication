import HttpError from '../HttpError';

export default class NotImplementedError extends HttpError {
  constructor(message = 'Method not implemented') {
    super(message);

    this.status = 501;
  }
}
