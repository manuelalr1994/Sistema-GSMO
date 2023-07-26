import { Module } from '@nestjs/common';
import { FreightModule } from './freight/freight.module';
import { PayrollModule } from './payroll/payroll.module';

@Module({
    imports: [
        FreightModule,
        PayrollModule
    ],
})
export class CatalogsModule {}