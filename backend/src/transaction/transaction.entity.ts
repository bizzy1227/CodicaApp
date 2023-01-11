import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IsNumber } from 'class-validator';
import { BaseDto } from '../global-definitions/dto/base.dto';
import { TransactionType } from './types/transaction-type';
import { Bank } from '../bank/bank.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Transaction extends BaseDto {
  @Column()
  @IsNumber()
  amount: number;

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
