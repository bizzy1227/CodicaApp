import { IsEnum, IsNumber, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { TransactionType } from '../types/transaction-type';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  categoriesIds: number[];

  @IsNotEmpty()
  @IsNumber()
  bankId: number;
}
