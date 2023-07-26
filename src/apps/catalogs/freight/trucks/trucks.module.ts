import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { CRUDModule } from 'src/common/modules/CRUD/CRUD.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { TokenModule } from 'src/common/modules/token/token.module';

@Module({
  controllers: [TrucksController],
  providers: [TrucksService],
  imports: [
    TokenModule,
    CRUDModule,
    TypeOrmModule.forFeature([ Truck ]),
  ],
})
export class TrucksModule {}
