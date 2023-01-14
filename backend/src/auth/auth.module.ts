import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { AppConfigModule } from '../config/app/config.module';

@Module({
  imports: [
    PassportModule, 
    ConfigModule,
    AppConfigModule,
  ],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}