import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GetVendorOrderDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  paymentId: number;
}
