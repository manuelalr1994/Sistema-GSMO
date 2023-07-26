import { Module } from '@nestjs/common';
import { StallsService } from './stalls.service';
import { StallsController } from './stalls.controller';
import { Stall } from './entities/stall.entity';
import { TokenModule } from 'src/common/modules/token/token.module';
import { CRUDModule } from 'src/common/modules/CRUD/CRUD.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StallsController],
  providers: [StallsService],
  imports: [
    TokenModule,
    CRUDModule,
    TypeOrmModule.forFeature([ Stall ]),
  ],
})
export class StallsModule {}
