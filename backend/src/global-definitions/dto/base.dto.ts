import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseDto {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}