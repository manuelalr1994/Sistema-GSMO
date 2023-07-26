import { Injectable } from '@nestjs/common';
import { CreateFreightCompanyDto } from './dto/create-freight-company.dto';
import { UpdateFreightCompanyDto } from './dto/update-freight-company.dto';

@Injectable()
export class FreightCompanyService {
  create(createFreightCompanyDto: CreateFreightCompanyDto) {
    return 'This action adds a new freightCompany';
  }

  findAll() {
    return `This action returns all freightCompany`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freightCompany`;
  }

  update(id: number, updateFreightCompanyDto: UpdateFreightCompanyDto) {
    return `This action updates a #${id} freightCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} freightCompany`;
  }
}
