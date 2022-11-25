export interface IMailTransmissionResult {
  succes: boolean;
  message: string;
}

export interface IMail {
  sourceAdress: string;
  destinationAdress: string;
  subject: string;
  body: string;
}
