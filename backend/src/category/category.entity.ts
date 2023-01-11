import { Column, Entity, ManyToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseDto } from '../global-definitions/dto/base.dto';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Category extends BaseDto {
  @Column({ unique: true })
  @IsString()
  name: string;

  @ManyToMany(() => Transaction, transaction => transaction.categories)
  transactions: Transaction[]
}
