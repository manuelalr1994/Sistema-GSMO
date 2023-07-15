import { Module } from '@nestjs/common';
import { TrucksModule } from './catalogs/trucks/trucks.module';

@Module({
  imports: [
    TrucksModule
  ],
})
export class FreightModule {}
