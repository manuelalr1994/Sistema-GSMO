import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TokenModule } from 'src/common/modules/token/token.module';
import { CRUDModule } from 'src/common/modules/CRUD/CRUD.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    TokenModule,
    CRUDModule,
    TypeOrmModule.forFeature([ Employee ]),
  ],
})
export class EmployeesModule {}
