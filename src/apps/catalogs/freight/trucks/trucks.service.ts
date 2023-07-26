import { Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { Repository } from 'typeorm';
import { CRUDService } from 'src/common/modules/CRUD/CRUD.service';
import { CONSTRAINT } from 'src/common/constants/constraints.const';
import { CrudOptions } from 'src/common/modules/CRUD/interfaces/crud-options.interface';

@Injectable()
export class TrucksService {

  private readonly createDto: CreateTruckDto;
  private readonly updateDto: UpdateTruckDto;
  private readonly options: CrudOptions = {
    title: "Camion",
    assignCode: CONSTRAINT.COMPANY,
  };

  constructor(
    @InjectRepository(Truck)
    private readonly repository: Repository<Truck>,
    private readonly crudService: CRUDService
    ) {
      this.crudService.setOptions( repository, this.options )
    }

    async create(createDto: typeof this.createDto) {
      return await this.crudService.create(createDto);
    }
  
    async createMany(createManyDto: typeof this.createDto[]) {
      return await this.crudService.createMany(createManyDto);
    }
  
    async findAll(paginationDto) {
      return await this.crudService.find(paginationDto);
    }
  
    async findOne(id: number) {
      return await this.crudService.findOne(id);
    }

    async update(id: number, updateDto: typeof this.updateDto) {
      return await this.crudService.update(id, updateDto);
    }
    
}
