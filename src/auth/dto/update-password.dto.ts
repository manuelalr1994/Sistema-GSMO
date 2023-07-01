import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class UpdatePasswordDto {

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString()
    oldPassword: string;

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString({ message: 'newPassword debe ser un string' })
    @Length(6, 50, { message: 'newPassword debe tener entre 6 y 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'newPassword debe tener una letra mayúscula, minúscula y un número'
    })
    newPassword: string;

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString({ message: 'newPassword debe ser un string' })
    @Length(6, 50, { message: 'newPassword debe tener entre 6 y 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'newPassword debe tener una letra mayúscula, minúscula y un número'
    })
    confirmNewPassword: string;

}