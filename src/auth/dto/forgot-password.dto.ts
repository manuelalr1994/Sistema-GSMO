import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'sevinosobreti@albur.com', description: 'User email direction' })
    email: string;
}