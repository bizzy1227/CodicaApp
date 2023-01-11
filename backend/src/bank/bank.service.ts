import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './bank.entity';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}
  
  async create(createBankDto: CreateBankDto): Promise<void> {    
    await this.bankRepository.save(createBankDto);
  }

  async findAll(): Promise<Bank[]> {
    return await this.bankRepository.find();
  }

  async findOne(id: number): Promise<Bank> {
    const bank = await this.bankRepository.findOne({ id });

    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    return bank;
  }

  async update(id: number, updateBankDto: UpdateBankDto): Promise<void> {
    const bank = await this.bankRepository.findOne({ id });
    
    if (!bank) {
      throw new NotFoundException('Bank not found');
    }

    await this.bankRepository.save({
      id,
      ...updateBankDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }
}
