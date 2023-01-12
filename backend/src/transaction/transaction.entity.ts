import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../global-definitions/dto/base.dto';
import { TransactionType } from './types/transaction-type';
import { Bank } from '../bank/bank.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Transaction extends BaseDto {
  @ApiProperty()
  @Column()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @ManyToMany(() => Category, category => category.transactions)
  @JoinTable({
    name: 'transactions_categories',
    joinColumn: {
      name: 'transactionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    }
  })
  categories: Category[];

  @ManyToOne(() => Bank, bank => bank.transactions)
  bank: Bank;
}
