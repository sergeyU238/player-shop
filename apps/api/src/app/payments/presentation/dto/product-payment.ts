import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class ProductPaymentDto {
  @IsDecimal()
  @IsNotEmpty()
  productId: number | string;

  @IsString()
  promocode?: string;
}
