import { Module } from '@nestjs/common';
import { CrewmenService } from './crewmen.service';
import { CrewmenController } from './crewmen.controller';

@Module({
  controllers: [CrewmenController],
  providers: [CrewmenService]
})
export class CrewmenModule {}
