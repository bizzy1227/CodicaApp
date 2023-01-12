import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  async createTransaction(
    @Body() webhookCreateTransactionDto: WebhookCreateTransactionDto,
  ): Promise<void> {
    await this.webhookService.createTransaction(webhookCreateTransactionDto);
  }
}
