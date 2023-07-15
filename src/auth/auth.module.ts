import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokenModule } from 'src/common/modules/token/token.module';
import { MailModule } from 'src/common/modules/mail/mail.module';
import { CRUDModule } from 'src/common/modules/CRUD/CRUD.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TokenModule,
    CRUDModule,
    MailModule,
    TypeOrmModule.forFeature([ User ])
  ]
})
export class AuthModule {}
