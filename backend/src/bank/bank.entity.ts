import { Entity, Column, OneToMany } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { BaseDto } from '../global-definitions/dto/base.dto';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Bank extends BaseDto {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.bank)
  transactions: Transaction[];
}
