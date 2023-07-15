import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtOptions, JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async sign(payload: JwtPayload, options?: JwtOptions) {
        const token = await this.jwtService.sign(payload, {secret: process.env.JWT_SECRET, ...options});

        return token;
    }

    async verify(token: string) {

        try {
            const payload = await this.jwtService.verify(token);
            return payload;
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

    }

}