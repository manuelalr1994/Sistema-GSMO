import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionMiddleware } from './action.middleware';
import { Action } from './entities/actions-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ActionService],
  exports: [ActionService],
  imports: [
    TypeOrmModule.forFeature([Action]),
  ],
})

export class ActionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActionMiddleware).forRoutes('*');
  }
}
