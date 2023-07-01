import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";


export class LoginUserDto {

    @ApiProperty({ example: 'tucorreo@gmail.com', description: 'Unique identifier email', minLength: 1 })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, minúscula y un número'
    })
    password: string;

}