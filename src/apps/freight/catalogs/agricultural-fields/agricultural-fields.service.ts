import { Injectable } from '@nestjs/common';
import { CreateAgriculturalFieldDto } from './dto/create-agricultural-field.dto';
import { UpdateAgriculturalFieldDto } from './dto/update-agricultural-field.dto';

@Injectable()
export class AgriculturalFieldsService {
  create(createAgriculturalFieldDto: CreateAgriculturalFieldDto) {
    return 'This action adds a new agriculturalField';
  }

  findAll() {
    return `This action returns all agriculturalFields`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agriculturalField`;
  }

  update(id: number, updateAgriculturalFieldDto: UpdateAgriculturalFieldDto) {
    return `This action updates a #${id} agriculturalField`;
  }

  remove(id: number) {
    return `This action removes a #${id} agriculturalField`;
  }
}
