import { Module } from '@nestjs/common';
import { TrucksModule } from './trucks/trucks.module';
import { FreightCompanyModule } from './freight-company/freight-company.module';

@Module({
  imports: [
    TrucksModule,
    FreightCompanyModule
  ],
})
export class FreightModule {}
