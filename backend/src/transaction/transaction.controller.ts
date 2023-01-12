import { Controller, Get, Param, Delete, Query, Res, HttpStatus, Body, Post } from '@nestjs/common';
import { PageOptionsDto } from '../global-definitions/dto/page-options.dto';
import { PageDto } from '../global-definitions/dto/page.dto';
import { GetTransactionStatisticDto } from './dto/get-transaction-statistic.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { Statistic } from './types/statistic';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Transaction>> {
    return await this.transactionService.findAll(pageOptionsDto);
  }

  @Post('/statistic')
  async getStatistic(
    @Res() res,
    @Body() body: GetTransactionStatisticDto,
  ): Promise<Statistic> {
    const result = await this.transactionService.getStatistic(body);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void>  {
    await this.transactionService.remove(+id);
  }
}
