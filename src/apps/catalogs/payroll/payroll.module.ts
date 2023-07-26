import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { StallsModule } from './stalls/stalls.module';

@Module({
  imports: [
    EmployeesModule,
    StallsModule,
  ],
})
export class PayrollModule {}
