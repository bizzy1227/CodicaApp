import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './bank.entity';
import { BankService } from './bank.service';

const banks = [
  {
    id: 1,
    name: 'Test1',
    balance: 1,
  },
];

describe('BankService', () => {
  let bankService: BankService;
  let repositoryBank: Repository<Bank>;

  const repositoryTokenBank = getRepositoryToken(Bank);


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: repositoryTokenBank,
          useValue: {
            find: jest.fn().mockImplementation(() => []),
            findOne: jest.fn().mockImplementation((id) => banks.find(b => b.id === id)),
          },
        },
      ],
    }).compile();

    repositoryBank = module.get(repositoryTokenBank);
    bankService = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(bankService).toBeDefined();
    expect(repositoryBank).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await bankService.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be return bank with id: 1', async () => {
      const result = await bankService.findOne(1);
      expect(result).toBe(banks[0]);
    });

    it('should be throw NotFoundException', async () => {
      await expect(bankService.findOne(2)).rejects.toThrow(
        new NotFoundException('Bank not found'),
      );
    });
  });

  describe('update', () => {
    it('should be throw NotFoundException', async () => {
      await expect(bankService.update(2, {})).rejects.toThrow(
        new NotFoundException('Bank not found'),
      );
    });
  });
});
