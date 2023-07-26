import { Injectable } from '@nestjs/common';
import { CreateCrewmanDto } from './dto/create-crewman.dto';
import { UpdateCrewmanDto } from './dto/update-crewman.dto';

@Injectable()
export class CrewmenService {
  create(createCrewmanDto: CreateCrewmanDto) {
    return 'This action adds a new crewman';
  }

  findAll() {
    return `This action returns all crewmen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crewman`;
  }

  update(id: number, updateCrewmanDto: UpdateCrewmanDto) {
    return `This action updates a #${id} crewman`;
  }

  remove(id: number) {
    return `This action removes a #${id} crewman`;
  }
}
