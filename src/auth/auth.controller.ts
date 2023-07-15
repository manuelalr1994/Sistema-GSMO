import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto, LoginUserDto, UpdatePasswordDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.const';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiPagination } from 'src/common/modules/CRUD/decorators/page.decorator';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('Usuarios')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Get('private')
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  privateRoute() {
    return { 
      ok: true,
      message: 'This is a private route'
    };
  }

  @Post('register')
  create(@Body() createUserDto: UserCreateDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @ApiPagination()
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  findAll(@Query() paginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLES.ADMIN, ROLES.SUPER_USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UserUpdateDto) {
    return this.authService.update(id, updateUserDto);
  }
}
