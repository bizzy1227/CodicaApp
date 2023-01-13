import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../global-definitions/dto/page-options.dto';
import { GetTransactionStatisticDto } from './dto/get-transaction-statistic.dto';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let transactionController: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionController,
        {
          provide: TransactionService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => []),
            getStatistic: jest.fn().mockImplementation(() => {}),
          },
        },
      ],
    }).compile();

    transactionController = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await transactionController.findAll(new PageOptionsDto());
      expect(result).toBeDefined();
    });
  });

  describe('getStatistic', () => {
    it('should be return result', async () => {
      const result = await transactionController.getStatistic(
        { status: () => ({ json: () => [] }) },
        new GetTransactionStatisticDto()
      );
      expect(result).toBeDefined();
    });
  });
});
