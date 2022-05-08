import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4846707462c652",
    pass: "e2fedaeac66780"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Icaro Miranda <miranda.icarox@gmail.com>',
      subject,
      html: body,
  });
  };
}