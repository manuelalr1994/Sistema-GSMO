import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [MailService],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('MAILER_EMAIL'),
            clientId: configService.get<string>('MAILER_CLIENT_ID'),
            clientSecret: configService.get<string>('MAILER_CLIENT_SECRET'),
            refreshToken: configService.get<string>('MAILER_REFRESH_TOKEN'),
          }
        }
      }),
      inject: [ConfigService]
    }),
  ],
  exports: [MailService]
})
export class MailModule {}
