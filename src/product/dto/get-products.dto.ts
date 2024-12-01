import { IsEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @IsInt()
  @IsEmpty()
  @IsOptional()
  page: number;
  @IsOptional()
  @IsInt()
  @IsEmpty()
  limit: number;
  @IsOptional()
  @IsEmpty()
  @IsString()
  search: string;
}
