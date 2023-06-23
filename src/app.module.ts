import { Module } from '@nestjs/common';
import { FreightModule } from './apps/freight/freight.module';
import { ConfigModule } from '@nestjs/config';
import { PayrollModule } from './apps/payroll/payroll.module';
import { AuthGroup } from './auth/auth.module';

import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    RouterModule.register(routes),
    AuthGroup,
    FreightModule,
    PayrollModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
