import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { BankService } from '../bank/bank.service';
import { PageOptionsDto } from '../global-definitions/dto/page-options.dto';
import { PageDto } from '../global-definitions/dto/page.dto';
import { PageMetaDto } from '../global-definitions/dto/page-meta.dto';
import { GetTransactionStatisticDto } from './dto/get-transaction-statistic.dto';
import { Statistic } from './types/statistic';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private categoryService: CategoryService,
    private bankService: BankService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const categories: Category[] = [];

    for await (const id of createTransactionDto.categoriesIds) {
      const category = await this.categoryService.findOne(id);

      if (!category) {
        this.logger.error(`create: Category with id: ${id} not found`);
        this.logger.error(category);
        throw new NotFoundException('Category not found');
      }

      categories.push(category);
    }

    const bank = await this.bankService.findOne(createTransactionDto.bankId);

    if (!bank) {
      this.logger.error(`create: Bank with id: ${createTransactionDto.bankId} not found`);
      this.logger.error(bank);
      throw new NotFoundException('Bank not found');
    }

    const transaction = await this.transactionRepository.save({
      ...createTransactionDto,
      categories,
      bank,
    });

    if (!transaction) {
      this.logger.error('create: Save transaction failed');
      this.logger.error(transaction);
      throw new InternalServerErrorException();
    }

    await this.bankService.update(bank.id, { balance: bank.balance + createTransactionDto.amount });

    return transaction;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Transaction>> {
    const queryBuilder = this.transactionRepository.createQueryBuilder("transaction");

    queryBuilder
      .orderBy("transaction.createdAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async remove(id: number): Promise<void>  {
    const transaction = await this.transactionRepository.findOne(id, { relations: ['bank'] });

    if (!transaction) {
      this.logger.error(`remove: Transaction with id: ${id} not found`);
      this.logger.error(transaction);
      throw new NotFoundException('Transaction not found');
    }

    await this.transactionRepository.delete(id);
    await this.bankService.update(transaction.bank.id, { balance: transaction.bank.balance - transaction.amount });
  }

  async getStatistic({ fromPeriod, toPeriod, categoryIds }: GetTransactionStatisticDto): Promise<Statistic> {
    const result: Statistic = {};

    const transactions = await this.transactionRepository.find({
      where: {
        createdAt: Between(fromPeriod, toPeriod),
      },
      relations: ['categories']
    });

    if (transactions.length === 0) {
      this.logger.log('getStatistic: Transactions not found');
      return result;
    }

    transactions.forEach(tx => {
      tx.categories.forEach(category => {
        if (categoryIds.length === 0 || categoryIds.includes(category.id)) {
          if (result.hasOwnProperty(category.name)) {
            result[category.name] += tx.amount;
          } else {
            result[category.name] = tx.amount;
          }
        }
      });
    });

    return result;
  }
}
