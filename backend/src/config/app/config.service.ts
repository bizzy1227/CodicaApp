import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TOKEN } from './configuration';
import { Port } from './types';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): Port {
    return this.configService.get<Port>(`${TOKEN}.port`);
  }

  get apiKey(): string {
    return this.configService.get<string>(`${TOKEN}.apiKey`);
  }
}
