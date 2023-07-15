import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { forgotPasswordTemplate } from './templates/forgot-password';

interface IEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: any;
}

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  sendEmail(emailOptions: IEmailOptions) {
    this.mailerService.sendMail({
      to: emailOptions.to,
      from: this.configService.get<string>('MAILER_EMAIL'),
      subject: emailOptions.subject,
      text: emailOptions.text,
      html: emailOptions.html,
      template: emailOptions.template,
      context: emailOptions.context
    });
  }

  async sendResetPasswordEmail(email, recoverPasswordToken) {

    const url = `http://localhost:9000/cambio-contrasena?token=${recoverPasswordToken}`;

    await this.sendEmail({
      to: email,
      subject: 'Recuperación de Contraseña Agroeasy',
      template: 'reset-password',
      context: { url },
      html: await forgotPasswordTemplate(url)
    });

    const message = `El email de recuperación de contraseña se ha enviado a ${email}`

    return { message };
  }

  async sendUpdatedPasswordEmail(email) {
    await this.sendEmail({
      to: email,
      subject: 'Cambio de Contraseña Sistema GSMO',
      text: `Se ha realizado un cambio de su contraseña en Sistema GSMO`,
      template: 'change-password'
    });
  }
}
