import { IsDecimal, IsNotEmpty } from 'class-validator';

export class GetProductsDto {
  @IsDecimal()
  @IsNotEmpty()
  page: string;

  @IsDecimal()
  @IsNotEmpty()
  limit: string;
}
