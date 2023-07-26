import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from '../config/typeorm.config';
import { MailModule } from './common/modules/mail/mail.module';
import { CatalogsModule } from './apps/catalogs/catalogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),

    RouterModule.register(routes),
    CatalogsModule,
    AuthModule,
    MailModule,
  ],
  providers: [],
})
export class AppModule {}
