import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { AppConfigService } from '../config/app/config.service';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(
    private readonly appConfig: AppConfigService,
  ) {
    super({ header: 'X-API-KEY', prefix: '' },
    true,
    async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate = (apiKey: string, done: (error: Error, data) => {}) => {
    if (this.appConfig.apiKey === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  }
}