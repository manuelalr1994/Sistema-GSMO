import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({ example: 'UH9MNH9GT4EU9T8EUM0TUV9MJIFEJIVJF90FESVFFVWLPP3', description: 'Token' })
    @IsString()
    token: string;

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString({ message: 'newPassword debe ser un string' })
    @Length(6, 50, { message: 'newPassword debe tener entre 6 y 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'newPassword debe tener una letra mayúscula, minúscula y un número'
    })
    newPassword: string;

    @ApiProperty({ example: 'Asd123', description: 'Unique identifier password', minLength: 6 })
    @IsString({ message: 'confirmNewPassword debe ser un string' })
    @Length(6, 50, { message: 'confirmNewPassword debe tener entre 6 y 50 caracteres' })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'confirmNewPassword debe tener una letra mayúscula, minúscula y un número'
    })
    confirmNewPassword: string;

}