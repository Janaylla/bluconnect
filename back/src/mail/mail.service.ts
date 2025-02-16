import { Injectable } from '@nestjs/common';
import { SendEmailDto, tempatesEmail } from './mail.dto';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class MailService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendEmail({ context, to, type }: SendEmailDto): Promise<void> {
    const template = tempatesEmail[type];
    const compiledHtml = template.tempate(context);

    const mailOptions = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: compiledHtml,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: template.subject,
        },
      },
      Source: process.env.EMAIL_USER, // Remetente
    };

    try {
      const command = new SendEmailCommand(mailOptions);
      await this.sesClient.send(command);
      console.log(`Email sent to ${to}:`);
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      throw new Error('Email sending failed');
    }
  }
}
