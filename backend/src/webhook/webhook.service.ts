import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Transaction } from '../transaction/transaction.entity';
import { ResultType } from '../global-definitions/constants/response-type';
import { TransactionService } from '../transaction/transaction.service';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';

@Injectable()
export class WebhookService {
  constructor(
    private transactionService: TransactionService,
  ) {}

  async createTransaction(webhookCreateTransactionDto: WebhookCreateTransactionDto): Promise<void> {
    try {
      const result: Transaction = await this.transactionService.create(webhookCreateTransactionDto.createTransactionDto);
      const isErorr = result instanceof Error;
      await axios.post(webhookCreateTransactionDto.callbackUrl, {
        transaction: isErorr ? null : result,
        webhookStatus: isErorr ? ResultType.FAILED : ResultType.SUCCESSFUL,
        error: isErorr ? result : null,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
