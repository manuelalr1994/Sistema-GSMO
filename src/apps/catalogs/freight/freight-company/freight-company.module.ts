import { Module } from '@nestjs/common';
import { FreightCompanyService } from './freight-company.service';
import { FreightCompanyController } from './freight-company.controller';
import { FreightCompany } from './entities/freight-company.entity';
import { TokenModule } from 'src/common/modules/token/token.module';
import { CRUDModule } from 'src/common/modules/CRUD/CRUD.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FreightCompanyController],
  providers: [FreightCompanyService],
  imports: [
    TokenModule,
    CRUDModule,
    TypeOrmModule.forFeature([ FreightCompany ]),
  ],
})
export class FreightCompanyModule {}
