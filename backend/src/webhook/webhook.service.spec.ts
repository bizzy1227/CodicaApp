import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ResultType } from '../global-definitions/constants/response-type';
import { TransactionType } from '../transaction/types/transaction-type';
import { TransactionService } from '../transaction/transaction.service';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';
import { WebhookService } from './webhook.service';

jest.mock('axios');

describe('WebhookService', () => {
  let webhookService: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: TransactionService,
          useValue: {
            create: jest.fn().mockImplementation((data) => data),
          },
        },
      ],
    }).compile();

    webhookService = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(webhookService).toBeDefined();
  });

  describe('createTransaction', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockReturnValue(
      new Promise((resolve) =>
        resolve({
          status: 200,
          data: { },
        }),
      ),
    );

    it('should be call to callback url', async () => {
      const dto = {
        createTransactionDto: {
          amount: 1,
          type: TransactionType.PROFITABLE,
          categoriesIds: [1],
          bankId: 1,
        },
        callbackUrl: 'https://test.com'
      } as WebhookCreateTransactionDto;

      await webhookService.createTransaction(dto);

      expect(mockedAxios.post).toHaveBeenCalled();     
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        dto.callbackUrl,
        {
          transaction: dto.createTransactionDto,
          webhookStatus: ResultType.SUCCESSFUL,
          error: null,
        }
      ); 
    });
  });
});
