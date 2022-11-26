import nodemailer from 'nodemailer';
import { APP_PORT } from '../config';
import { IMail, IMailTransmissionResult } from '../model/Mail';
import { IUserDto } from '../model/User';

export default class MailService {
  private transporter;

  constructor(transporter: nodemailer.Transporter) {
    this.transporter = transporter;
  }

  async sendMail(mail: IMail): Promise<IMailTransmissionResult> {
    try {
      const mailResult = await this.transporter.sendMail({
        from: mail.sourceAdress,
        to: mail.destinationAdress,
        subject: mail.subject,
        html: mail.body,
      });
      return { message: `Message sent: ${mailResult}`, succes: true };
    } catch (error) {
      return { message: `Message not sent: ${error}`, succes: false };
    }
  }

  createBody(user: IUserDto) {
    const body = `<body>
      <h2>Hello ${user.username}! </h2>
      <p>We're glad to have you on board! </p>
      <p>Please confirm your email adress by clicking on the following link:</p>
      <a href=http://localhost:${APP_PORT}/auth/confirm-registration/${user.confirmationCode}>Click here to confirm.</a>
    </body>`;

    return body;
  }
}
