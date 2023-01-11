import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TransactionModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
