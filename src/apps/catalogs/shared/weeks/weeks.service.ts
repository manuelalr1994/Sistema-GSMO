import { Injectable } from '@nestjs/common';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';

@Injectable()
export class WeeksService {
  create(createWeekDto: CreateWeekDto) {
    return 'This action adds a new week';
  }

  findAll() {
    return `This action returns all weeks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} week`;
  }

  update(id: number, updateWeekDto: UpdateWeekDto) {
    return `This action updates a #${id} week`;
  }

  remove(id: number) {
    return `This action removes a #${id} week`;
  }
}
