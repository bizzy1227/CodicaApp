import { IsString, IsNotEmpty, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from '../../transaction/dto/create-transaction.dto';

export class WebhookCreateTransactionDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateTransactionDto)
  @IsNotEmpty()
  createTransactionDto: CreateTransactionDto;

  @ApiProperty({ example: 'https://webhook.site' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  callbackUrl: string;
}
