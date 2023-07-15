import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreateDto, LoginUserDto, UserUpdateDto, UpdatePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
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


  // update password method
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {

    const { oldPassword, newPassword, confirmNewPassword } = updatePasswordDto;

    if (newPassword != confirmNewPassword) {
      throw new HttpException('Las contraseñas no coinciden', HttpStatus.BAD_REQUEST);
    }

    const userFound = await this.crudService.findOne( id );

    const hashedOldPassword = bcrypt.hashSync(oldPassword, 10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    if (userFound.password != hashedOldPassword) {
      throw new HttpException('La contraseña actual no coincide', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = {
      ...userFound,
      password: hashedNewPassword
    };

    await this.crudService.update(userFound.id, updatedUser);

    delete updatedUser.password;

    await this.mailService.sendUpdatedPasswordEmail(updatedUser.email);

    return `La contraseña del usuario con id: ${id} ha sido actualizada`;
  }

  // forgot password method
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {

    let { email } = forgotPasswordDto;
    email = email.toLowerCase();

    const userFound = await this.repository.findOneBy({ email });

    if (!userFound) return `El email ${email} no está registrado`;

    const date = new Date()
    const payload = { email, date }

    const passwordToken = await this.tokenService.sign(payload, { expiresIn: '1h'});
    const encodedToken = encodeURIComponent(passwordToken);

    await this.mailService.sendResetPasswordEmail(userFound.email, encodedToken);


    return `El email de recuperación de contraseña se ha enviado a ${email}`;
  }

  // reset password method
  async resetPassword(resetPasswordDto: ResetPasswordDto) {

    const { token, newPassword, confirmNewPassword } = resetPasswordDto;

    if (newPassword != confirmNewPassword) {
      throw new HttpException('Las contraseñas no son iguales', HttpStatus.BAD_REQUEST);
    }

    const decodedToken = decodeURIComponent(token);

    const payload = await this.tokenService.verify( decodedToken );

    if (!payload) {
      throw new HttpException('El token no es válido', HttpStatus.BAD_REQUEST);
    }

    const { email } = payload;

    const userFound = await this.repository.findOne({ where: { email } });

    if (!userFound) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

    const updatedUser = {
      ...userFound,
      password: hashedNewPassword
    };

    await this.crudService.update(userFound.id, updatedUser);

    await this.mailService.sendUpdatedPasswordEmail(updatedUser.email);

    return `La contraseña del usuario con email: ${email} ha sido actualizada`;
  }
  
}
