import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration';
import { AppConfigService } from './config.service';
import { ValidationSchema } from './interfaces/validation-schema';

const validationSchema = Joi.object<ValidationSchema>({
  APP_PORT: Joi.number().default(4000),
  APP_API_KEY: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
