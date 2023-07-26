import { Module } from '@nestjs/common';
import { AgriculturalFieldsService } from './agricultural-fields.service';
import { AgriculturalFieldsController } from './agricultural-fields.controller';

@Module({
  controllers: [AgriculturalFieldsController],
  providers: [AgriculturalFieldsService]
})
export class AgriculturalFieldsModule {}
