import { Module } from '@nestjs/common';
import { MailsModule } from './mails/mails.module';
import { AuthModule } from './users/auth/auth.module';
import { RolesModule } from './users/roles/roles.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MailsModule,
    AuthModule,
    RolesModule
  ]
})
export class AuthGroup {}
