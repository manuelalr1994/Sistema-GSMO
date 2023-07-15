import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Matches, Length, IsOptional, IsInt } from "class-validator";


export class UserCreateDto {

    @ApiProperty({ example: '001', description: 'Codigo de usuario', minLength: 3, maxLength: 3 })
    @IsString({ message: 'code debe ser de tipo: string' })
    @Length(3, 3, { message: 'code debe tener una longitud de 3 caracteres' })
    @Matches(/^[0-9]+$/, { message: 'code debe contener solo numeros' })
    code: string;

    @ApiProperty({ example: 'Jorge', description: 'Nombre', minLength: 1, maxLength: 40 })
    @IsString({ message: 'name debe ser de tipo: string' })
    @Length(1, 40, { message: 'name debe tener una longitud de 1 a 40 caracteres' })
    @Matches(/^[A-Za-z ]+$/, { message: 'name debe contener solo letras' })
    name: string;

    @ApiProperty({ example: 'Nitales', description: 'Nombre', minLength: 1, maxLength: 40 })
    @IsString({ message: 'lastName debe ser de tipo: string' })
    @Length(1, 40, { message: 'lastName debe tener una longitud de 1 a 40 caracteres' })
    @Matches(/^[A-Za-z ]+$/, { message: 'lastName debe contener solo letras' })
    lastName: string;

    @ApiProperty({ example: 'JorgeNitales@albur.com', description: 'User email direction' })
    @IsString({ message: 'email debe ser de tipo: string' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'escv753', description: 'User password', minLength: 6, maxLength: 50, pattern: '(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*' })
    @IsString({ message: 'password debe ser de tipo: string'})
    @Length(6, 50, { message: 'password debe tener una longitud de 6 a 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password debe tener una letra mayúscula, minúscula y un número'
    })
    password: string;

    @ApiProperty({ example: 1, description: 'Id de Rol' })
    @IsOptional()
    @IsInt({ message: 'role debe ser de tipo: numeric string' })
    role?: number;

}