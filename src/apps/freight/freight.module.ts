import { Module } from '@nestjs/common';
import { TrucksModule } from './catalogs/trucks/trucks.module';
import { AgriculturalFieldsModule } from './catalogs/agricultural-fields/agricultural-fields.module';

@Module({
  imports: [
    TrucksModule,
    AgriculturalFieldsModule
  ],
})
export class FreightModule {}
