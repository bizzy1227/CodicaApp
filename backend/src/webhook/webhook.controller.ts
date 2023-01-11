import { Body, Controller, Post } from '@nestjs/common';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async createTransaction(
    @Body() webhookCreateTransactionDto: WebhookCreateTransactionDto,
  ): Promise<void> {
    await this.webhookService.createTransaction(webhookCreateTransactionDto);
  }
}
