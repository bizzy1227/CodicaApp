import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionType } from './types/transaction-type';
import { PageOptionsDto } from '../global-definitions/dto/page-options.dto';

const banks = [
  {
    id: 1,
    name: 'Test1',
    balance: 1,
  },
];

const categories = [
  {
    id: 1,
    name: 'Test1',
  },
];

let transactions = [
  {
    id: 1,
    amount: 1,
    type: TransactionType.PROFITABLE,
    categoriesIds: [1],
    bankId: 1,
    categories: [
      {
        id: 1,
        name: 'Category 1',
      },
    ],
    bank: {
      id: 1,
      name: 'Test1',
      balance: 1,
    },
  },
  {
    id: 2,
    amount: 1,
    type: TransactionType.PROFITABLE,
    categoriesIds: [1, 2],
    bankId: 1,
    categories: [
      {
        id: 1,
        name: 'Category 1',
      },
      {
        id: 2,
        name: 'Category 2',
      },
    ],
    bank: {
      id: 1,
      name: 'Test1',
      balance: 1,
    },
  },
];

let dto = {
  amount: 1,
  type: TransactionType.PROFITABLE,
  categoriesIds: [1],
  bankId: 1,
} as CreateTransactionDto;

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let repositoryTransaction: Repository<Transaction>;

  const repositoryTokenTransaction = getRepositoryToken(Transaction);

  beforeEach(async () => {
    dto = {
      amount: 1,
      type: TransactionType.PROFITABLE,
      categoriesIds: [1],
      bankId: 1,
    } as CreateTransactionDto;
    transactions = [
      {
        id: 1,
        amount: 1,
        type: TransactionType.PROFITABLE,
        categoriesIds: [1],
        bankId: 1,
        categories: [
          {
            id: 1,
            name: 'Category 1',
          },
        ],
        bank: {
          id: 1,
          name: 'Test1',
          balance: 1,
        },
      },
      {
        id: 2,
        amount: 1,
        type: TransactionType.PROFITABLE,
        categoriesIds: [1, 2],
        bankId: 1,
        categories: [
          {
            id: 1,
            name: 'Category 1',
          },
          {
            id: 2,
            name: 'Category 2',
          },
        ],
        bank: {
          id: 1,
          name: 'Test1',
          balance: 1,
        },
      },
    ];
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: repositoryTokenTransaction,
          useValue: {
            find: jest.fn().mockImplementation(() => transactions),
            findOne: jest.fn().mockImplementation((id) => transactions.find(b => b.id === id)),
            save: jest.fn().mockImplementation((data) => data),
            delete: jest.fn().mockImplementation(() => {}),
            createQueryBuilder: jest.fn().mockImplementation(() => ({
              orderBy: jest.fn().mockImplementation(() => ({
                skip: jest.fn().mockImplementation(() => ({
                  take: jest.fn().mockImplementation(() => []),
                })),
              })),
              getCount: jest.fn().mockImplementation(() => 0),
              getRawAndEntities: jest.fn().mockImplementation(() => 0),
            })),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findOne: jest.fn().mockImplementation((id) => categories.find(b => b.id === id)),
          },
        },
        {
          provide: BankService,
          useValue: {
            findOne: jest.fn().mockImplementation((id) => banks.find(b => b.id === id)),
            update: jest.fn().mockImplementation((id, dto) => {
              const index = banks.indexOf(banks.find(b => (b.id === id)));
              banks[index] = {
                ...banks[index],
                ...dto,
              };
            }),
          },
        },
      ],
    }).compile();

    repositoryTransaction = module.get(repositoryTokenTransaction);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
    expect(repositoryTransaction).toBeDefined();
  });

  describe('create', () => {
    it('should be return result', async () => {
      const result = await transactionService.create(dto);
      expect(result).toBeDefined();
    });

    it('balance must be increased', async () => {
      banks[0].balance = 1;
      await transactionService.create(dto);
      expect(banks[0].balance).toBe(2);
    });

    it('balance must be reduced', async () => {
      banks[0].balance = 1;
      dto.amount = -1;
      await transactionService.create(dto);
      expect(banks[0].balance).toBe(0);
    });

    it('should be throw NotFoundException', async () => {
      dto.categoriesIds = [2];
      await expect(transactionService.create(dto)).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });

    it('should be throw NotFoundException', async () => {
      dto.bankId = 2;
      dto.categoriesIds = [1];
      await expect(transactionService.create(dto)).rejects.toThrow(
        new NotFoundException('Bank not found'),
      );
    });
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await transactionService.findAll(new PageOptionsDto());
      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('balance must be reduced', async () => {
      banks[0].balance = 1;
      await transactionService.remove(1);
      expect(banks[0].balance).toBe(0);
    });
    
    it('balance must be increased', async () => {
      transactions[0].amount = -1;
      banks[0].balance = 1;
      await transactionService.remove(1);
      expect(banks[0].balance).toBe(2);
    });

    it('should be throw NotFoundException', async () => {
      await expect(transactionService.remove(3)).rejects.toThrow(
        new NotFoundException('Transaction not found'),
      );
    });
  });

  describe('getStatistic', () => {
    it('should be return one category', async () => {
      const result = await transactionService.getStatistic({
        fromPeriod: new Date,
        toPeriod: new Date,
        categoryIds: [1],
      });
      expect(result).toStrictEqual({ 'Category 1': "2.00" });
      expect(result['Category 1']).toBe("2.00");
    });

    it('should be return two category', async () => {
      const result = await transactionService.getStatistic({
        fromPeriod: new Date,
        toPeriod: new Date,
        categoryIds: [1, 2],
      });
      expect(result).toStrictEqual({ 'Category 1': "2.00", 'Category 2': "1.00" });
      expect(result['Category 1']).toBe("2.00");
      expect(result['Category 2']).toBe("1.00");
    });
  });
});
