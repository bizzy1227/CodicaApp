import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number; 
}
