import { IsNotEmpty, IsString } from 'class-validator';

export class GetPromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
