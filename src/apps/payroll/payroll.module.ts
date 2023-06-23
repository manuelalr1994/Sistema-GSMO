import { Module } from '@nestjs/common';
import { EmployeesModule } from './catalogs/employees/employees.module';
import { AgriculturalFieldsModule } from './catalogs/agricultural-fields/agricultural-fields.module';

@Module({
  imports: [
    EmployeesModule,
    AgriculturalFieldsModule,
  ],
})
export class PayrollModule {}
