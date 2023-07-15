import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/modules/token/interfaces/jwt.interface';
import { UserUpdateDto } from './dto/user-update.dto';
import { CrudOptions } from 'src/common/modules/CRUD/interfaces/crud-options.interface';
import { CRUDService } from 'src/common/modules/CRUD/CRUD.service';
import { MailService } from 'src/common/modules/mail/mail.service';
import { TokenService } from 'src/common/modules/token/token.service';

@Injectable()
export class AuthService {

  private readonly createDto: UserCreateDto
  private readonly updateDto: UserUpdateDto
  private readonly LoginDto: LoginUserDto
  private readonly options: CrudOptions= {
    title: "Usuarios",
    exclude: ["password"],
    defaultSelect: {
      id: true,
      code: true,
      name: true,
      lastName: true,
      email: true,
      isActive: true,
      role: true
    }
  }

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly crudService: CRUDService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService
  ) {
    this.crudService.setOptions(repository, this.options);
  }

  // create method
  async create(createUserDto: UserCreateDto) {

    let { password } = createUserDto;

    const data = {
      ...createUserDto,
      password: bcrypt.hashSync(password, 10)
    }

    const newUser = await this.crudService.create(data);

    const { token } = await this.login({ email: newUser.email, password });

    return {
      ...newUser,
      token
    }
  }

  // login method
  async login(loginUserDto: typeof this.LoginDto) {

    const { password, email } = loginUserDto;

    let fullUser = await this.repository.findOne({
      where: { email }
    });

    if (!fullUser || !bcrypt.compareSync(password, fullUser.password))
      throw new HttpException('Correo o contraseña incorrectos', HttpStatus.BAD_REQUEST);

    const role = fullUser.role;
    const token = await this.tokenService.sign({ email, role });

    const { password: UserPassword, ...user } = fullUser;

    return {
      ...user,
      token
    };
  }

  // findAll method
  async findAll(paginationDto) {
    return await this.crudService.find(paginationDto);
  }

  // findOne method
  async findOne(id: number) {
    return await this.crudService.findOne(id)
  }

  // update method
  async update(id: number, updateUserDto: typeof this.updateDto) {
    let userFound = await this.repository.findOne({ where: {id} });

    const { password, ...userDto } = updateUserDto;

    const updatedUser = {
      ...userFound,
      ...userDto
    };

    const updateResult = await this.crudService.update(userFound.id, updatedUser);

    return updateResult;
  }
}
