import { PartialType } from '@nestjs/mapped-types';
import { CreateAgriculturalFieldDto } from './create-agricultural-field.dto';

export class UpdateAgriculturalFieldDto extends PartialType(CreateAgriculturalFieldDto) {}
