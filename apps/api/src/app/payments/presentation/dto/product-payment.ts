import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductPaymentDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsString()
  promocode?: string;
}
