import { IsString, IsNotEmpty, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTransactionDto } from '../../transaction/dto/create-transaction.dto';

export class WebhookCreateTransactionDto {
  @ValidateNested()
  @Type(() => CreateTransactionDto)
  @IsNotEmpty()
  createTransactionDto: CreateTransactionDto;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  callbackUrl: string;
}
