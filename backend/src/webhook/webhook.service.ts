import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Transaction } from '../transaction/transaction.entity';
import { ResultType } from '../global-definitions/constants/response-type';
import { TransactionService } from '../transaction/transaction.service';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  constructor(
    private transactionService: TransactionService,
  ) {}

  async createTransaction({ createTransactionDto, callbackUrl }: WebhookCreateTransactionDto): Promise<void> {
    try {
      const result: Transaction = await this.transactionService.create(createTransactionDto);
      const isErorr = result instanceof Error;
      this.logger.log(`createTransaction: Send result to url ${callbackUrl}`);
      await axios.post(callbackUrl, {
        transaction: isErorr ? null : result,
        webhookStatus: isErorr ? ResultType.FAILED : ResultType.SUCCESSFUL,
        error: isErorr ? result : null,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
