import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
    providers: [TokenService, JwtService],
    imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
        global: true,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
        
        return {
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '24h' }
        }
        }
    }),
    TypeOrmModule.forFeature([ User ])
    ],
    exports: [TokenService, ConfigModule, PassportModule, JwtModule, JwtService, TypeOrmModule ]
})
export class TokenModule {}
