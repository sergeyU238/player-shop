import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  limit: number;
}
