import { IsEnum, IsNumber, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../types/transaction-type';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ type: () => Number, isArray: true })
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  categoriesIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bankId: number;
}
