import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto) {
    try {

      const { password, ...userData } = createUserDto;

      const data = this.repository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.repository.save(data);
      delete data.password;

      return data;

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    let data = await this.repository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if ( !data || !bcrypt.compareSync(password, data.password) ) 
      throw new HttpException('Correo o contraseña incorrectos', HttpStatus.BAD_REQUEST);

    delete data.password;
    return data;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdatePasswordDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  // This method is used to handle errors from the database

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }
}
