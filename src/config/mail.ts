import nodemailer from 'nodemailer';

const {
  SMTP_HOST = 'smtp-relay.sendinblue.com',
  SMTP_PORT = 587,
  SMTP_USERNAME = 'm',
  SMTP_PASSWORD = '',
} = process.env;

interface ITransporterConfig {
  host: string;
  port: number;
  secure: false;
  userName: string;
  password: string;
}

export const createTransporter = (
  transporterConfig: ITransporterConfig
): nodemailer.Transporter => {
  return nodemailer.createTransport({
    host: transporterConfig.host,
    port: transporterConfig.port,
    secure: transporterConfig.secure, // upgrade later with STARTTLS
    auth: {
      user: transporterConfig.userName,
      pass: transporterConfig.password,
    },
  });
};

export const mailTransporter = createTransporter({
  host: SMTP_HOST,
  port: +SMTP_PORT,
  userName: SMTP_USERNAME,
  password: SMTP_PASSWORD,
  secure: false,
});
