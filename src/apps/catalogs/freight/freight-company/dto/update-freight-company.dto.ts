import { PartialType } from '@nestjs/mapped-types';
import { CreateFreightCompanyDto } from './create-freight-company.dto';

export class UpdateFreightCompanyDto extends PartialType(CreateFreightCompanyDto) {}
