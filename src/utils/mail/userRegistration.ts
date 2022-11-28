import { APP_PORT } from '../../config';
import { IUserDto } from '../../model/User';

export const createBodyConfirmRegistration = (user: IUserDto) => {
  const body = `
    <body>
      <h2>Hello ${user.username}! </h2>
      <p>We're glad to have you on board! </p>
      <p>Please confirm your email adress by clicking on the following link:</p>
      <a href=http://localhost:${APP_PORT}/auth/confirm-registration/${user.confirmationCode}>Click here to confirm.</a>
    </body>`;

  return body;
};
