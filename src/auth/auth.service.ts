import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // This method is used to generate a token
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload, {secret: process.env.JWT_SECRET});
    return token;
  } 

  // create method
  async create(createUserDto: UserCreateDto) {
    try {

      const { password, ...userData } = createUserDto;

      const data = this.repository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.repository.save(data);
      
      const token = this.getJwtToken({ email: data.email });
      delete data.password;

      return { ...data, token };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // login method
  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto;

    let data = await this.repository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if ( !data || !bcrypt.compareSync(password, data.password) ) 
      throw new HttpException('Correo o contraseña incorrectos', HttpStatus.BAD_REQUEST);

      const token = this.getJwtToken({ email });

      delete data.password;
  
      return {
        ...data,
        token
      };
  }

  // findAll method
  findAll() {
    return `This action returns all auth`;
  }

  // findOne method
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update method
  update(id: number, updateAuthDto: UpdatePasswordDto) {
    return `This action updates a #${id} auth`;
  }

  // remove method
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
