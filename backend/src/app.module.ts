import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { PostgresConfigModule } from './config/db/postgres/config.module';
import { PostgresConfigService } from './config/db/postgres/config.service';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { WebhookModule } from './webhook/webhook.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useExisting: PostgresConfigService,
    }),
    BankModule,
    CategoryModule,
    TransactionModule,
    WebhookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
