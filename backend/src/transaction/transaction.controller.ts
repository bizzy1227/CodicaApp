import { Controller, Get, Param, Delete } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return await this.transactionService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void>  {
    await this.transactionService.remove(+id);
  }
}
