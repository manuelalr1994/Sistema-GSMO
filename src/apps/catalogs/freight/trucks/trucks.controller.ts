import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/modules/CRUD/decorators/page.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES } from 'src/common/constants/roles.const';

@ApiTags('Camiones')
@Controller()
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  create(@Body() createCropDto: CreateTruckDto) {
    return this.trucksService.create(createCropDto);
  }

  @Get()
  @ApiPagination()
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.OFFICE, ROLES.PACKAGING)
  findAll(@Query() paginationDto) {
    return this.trucksService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.OFFICE, ROLES.PACKAGING)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trucksService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(id, updateTruckDto);
  }

}
