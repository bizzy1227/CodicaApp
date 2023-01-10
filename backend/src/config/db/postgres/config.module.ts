import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfigService } from './config.service';
import { configuration } from './configuration';
import { ValidationSchema } from './interfaces/validation-schema';

const validationSchema = Joi.object<ValidationSchema>({
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.string().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
})

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [PostgresConfigService, ConfigService],
  exports: [PostgresConfigService, ConfigService]
})
export class PostgresConfigModule {}
