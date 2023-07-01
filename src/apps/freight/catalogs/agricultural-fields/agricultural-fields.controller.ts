import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgriculturalFieldsService } from './agricultural-fields.service';
import { CreateAgriculturalFieldDto } from './dto/create-agricultural-field.dto';
import { UpdateAgriculturalFieldDto } from './dto/update-agricultural-field.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Campos Agrícolas (freight)')
@Controller()
export class AgriculturalFieldsController {
  constructor(private readonly agriculturalFieldsService: AgriculturalFieldsService) {}

  @Post()
  create(@Body() createAgriculturalFieldDto: CreateAgriculturalFieldDto) {
    return this.agriculturalFieldsService.create(createAgriculturalFieldDto);
  }

  @Get()
  findAll() {
    return this.agriculturalFieldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agriculturalFieldsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgriculturalFieldDto: UpdateAgriculturalFieldDto) {
    return this.agriculturalFieldsService.update(+id, updateAgriculturalFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agriculturalFieldsService.remove(+id);
  }
}
