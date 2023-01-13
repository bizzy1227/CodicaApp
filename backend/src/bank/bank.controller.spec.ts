import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

describe('BankController', () => {
  let bankController: BankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        BankController,
        {
          provide: BankService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => []),
            findOne: jest.fn().mockImplementation(() => ({})),
          },
        },
      ],
    }).compile();

    bankController = module.get<BankController>(BankController);
  });

  it('should be defined', () => {
    expect(bankController).toBeDefined();
  });

  describe('findAll', () => {
    it('should be return result', async () => {
      const result = await bankController.findAll();
      expect(result).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be return result', async () => {
      const result = await bankController.findOne('1');
      expect(result).toBeDefined();
    });
  });
});
