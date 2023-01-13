import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity } from '@nestjs/swagger';
import { WebhookCreateTransactionDto } from './dto/webhook-create-transaction.dto';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @ApiSecurity('X-API-KEY')
  @UseGuards(AuthGuard('api-key'))
  async createTransaction(
    @Body() webhookCreateTransactionDto: WebhookCreateTransactionDto,
  ): Promise<void> {
    this.logger.log('createTransaction: create transaction');
    this.logger.log(JSON.stringify(webhookCreateTransactionDto));
    await this.webhookService.createTransaction(webhookCreateTransactionDto);
  }
}
