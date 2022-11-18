import NotImplementedError from '../error/implementations/NotImplementedError';

export default class AuthService {
  login = () => {
    throw new NotImplementedError();
  };
}
