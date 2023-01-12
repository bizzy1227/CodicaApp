import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { PageOptionsDto } from '../global-definitions/dto/page-options.dto';
import { PageDto } from '../global-definitions/dto/page.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Transaction>> {
    return await this.transactionService.findAll(pageOptionsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void>  {
    await this.transactionService.remove(+id);
  }
}
