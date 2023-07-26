import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeeksService } from './weeks.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';

@Controller('weeks')
export class WeeksController {
  constructor(private readonly weeksService: WeeksService) {}

  @Post()
  create(@Body() createWeekDto: CreateWeekDto) {
    return this.weeksService.create(createWeekDto);
  }

  @Get()
  findAll() {
    return this.weeksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekDto: UpdateWeekDto) {
    return this.weeksService.update(+id, updateWeekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeksService.remove(+id);
  }
}
