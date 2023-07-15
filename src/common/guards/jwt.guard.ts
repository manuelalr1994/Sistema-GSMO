import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLES } from 'src/common/constants/roles.const';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/roles.decorator';
import { Debugger } from 'src/common/modules/debug/helpers/debug.helper';
import { emptyArray } from '../validators/empty.validator';
import { TokenService } from '../modules/token/token.service';
import { JwtPayload } from '../modules/token/interfaces/jwt.interface';
import { Request } from 'express';

const log = Debugger.log;

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tokenService: TokenService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request: Request = context.switchToHttp().getRequest();
        const token: string = request.headers.authorization?.replace('Bearer ', '');
        const neededRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() )

        if (!token) {
            const role: string = ROLES.USER;
            const isValid: boolean = await this.validateRole( neededRoles, role );

            return isValid;
        }

        const payload: JwtPayload = await this.tokenService.verify( token );        
        const { email } = payload;
        const user: User = await this.userRepository.findOneBy({ email });
        
        if (!user || !user.isActive) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const userRole: string = user.role;
        const isValid: boolean = await this.validateRole( neededRoles, userRole, token );

        return isValid;
    }


    async validateRole(neededRoles: string[], userRole: string, token?: string) {
        const JWT = {
            tokenDetected: token ? true : false,
            token,
            needs: neededRoles,
            has: userRole
        } // For debugging purposes

        if (token) log({ JWT }) // For debugging purposes

        if (emptyArray(neededRoles)) return true;
        if (neededRoles.includes(userRole)) return true;

        if (!token) log({ JWT }) // For debugging purposes

        return false;
    }
}