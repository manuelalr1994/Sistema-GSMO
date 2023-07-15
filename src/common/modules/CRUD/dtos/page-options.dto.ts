import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PageOrder } from '../enums/page-order.enum';


export class PaginationDto {

    @IsOptional()
    @Type(() => Number)
    @Min(0)
    limit: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;
    
    @IsOptional()
    @Type(() => String)
    @IsString()
    sort: string;
    
    @IsOptional()
    @Type(() => String)
    @IsEnum(PageOrder)
    order: PageOrder;
    
    @IsOptional()
    @Type(() => String)
    @IsString()
    fields: string;    
}
