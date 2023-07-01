import { Module } from '@nestjs/common';
import { FreightModule } from './apps/freight/freight.module';
import { ConfigModule } from '@nestjs/config';
import { PayrollModule } from './apps/payroll/payroll.module';
import { AuthModule } from './auth/auth.module';

import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),

    RouterModule.register(routes),
    AuthModule,
    MailsModule,
    FreightModule,
    PayrollModule
  ],
  providers: [],
})
export class AppModule {}
