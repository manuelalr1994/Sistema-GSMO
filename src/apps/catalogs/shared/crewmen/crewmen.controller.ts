import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrewmenService } from './crewmen.service';
import { CreateCrewmanDto } from './dto/create-crewman.dto';
import { UpdateCrewmanDto } from './dto/update-crewman.dto';

@Controller('crewmen')
export class CrewmenController {
  constructor(private readonly crewmenService: CrewmenService) {}

  @Post()
  create(@Body() createCrewmanDto: CreateCrewmanDto) {
    return this.crewmenService.create(createCrewmanDto);
  }

  @Get()
  findAll() {
    return this.crewmenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewmenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrewmanDto: UpdateCrewmanDto) {
    return this.crewmenService.update(+id, updateCrewmanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crewmenService.remove(+id);
  }
}
