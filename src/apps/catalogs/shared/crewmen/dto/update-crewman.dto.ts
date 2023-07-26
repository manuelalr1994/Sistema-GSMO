import { PartialType } from '@nestjs/mapped-types';
import { CreateCrewmanDto } from './create-crewman.dto';

export class UpdateCrewmanDto extends PartialType(CreateCrewmanDto) {}
