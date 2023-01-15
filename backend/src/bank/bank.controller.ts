import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { Bank } from './bank.entity';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  private readonly logger = new Logger(BankController.name);
  constructor(private readonly bankService: BankService) {}

  @Post()
  async create(
    @Body() createBankDto: CreateBankDto,
  ): Promise<void> {
    this.logger.log('create: create bank');
    this.logger.log(JSON.stringify(createBankDto));
    await this.bankService.create(createBankDto);
  }

  @Get()
  async findAll(): Promise<Bank[]> {
    this.logger.log('findAll: find all banks');
    return await this.bankService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bank> {
    this.logger.log(`findOne: find bank with id: ${id}`);
    return await this.bankService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<void> {
    this.logger.log(`update: update bank with id: ${id}`);
    this.logger.log(JSON.stringify(updateBankDto));
    await this.bankService.update(+id, updateBankDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`remove: remove bank with id: ${id}`);
    await this.bankService.remove(+id);
  }
}
