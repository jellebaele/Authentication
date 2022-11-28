import nodemailer from 'nodemailer';
import { IMail, IMailTransmissionResult } from '../model/Mail';

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
}
