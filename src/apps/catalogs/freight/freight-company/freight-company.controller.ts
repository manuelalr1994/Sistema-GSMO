import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FreightCompanyService } from './freight-company.service';
import { CreateFreightCompanyDto } from './dto/create-freight-company.dto';
import { UpdateFreightCompanyDto } from './dto/update-freight-company.dto';

@Controller('freight-company')
export class FreightCompanyController {
  constructor(private readonly freightCompanyService: FreightCompanyService) {}

  @Post()
  create(@Body() createFreightCompanyDto: CreateFreightCompanyDto) {
    return this.freightCompanyService.create(createFreightCompanyDto);
  }

  @Get()
  findAll() {
    return this.freightCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freightCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFreightCompanyDto: UpdateFreightCompanyDto) {
    return this.freightCompanyService.update(+id, updateFreightCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freightCompanyService.remove(+id);
  }
}
