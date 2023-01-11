import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Bank } from './bank.entity';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  async create(
    @Body() createBankDto: CreateBankDto,
  ): Promise<void> {
    await this.bankService.create(createBankDto);
  }

  @Get()
  async findAll(): Promise<Bank[]> {
    return await this.bankService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bank> {
    return await this.bankService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(+id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bankService.remove(+id);
  }
}
