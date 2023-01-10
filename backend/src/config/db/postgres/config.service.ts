import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TOKEN } from './configuration';
import { PostgresHost, PostgresPort } from './types';

const ENTITIES_PATTERN = '**/*.entity{.ts,.js}';
const MIGRATIONS_PATTERN = 'migrations/*{.ts,.js}';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  get host(): PostgresHost {
    return this.configService.get<PostgresHost>(`${TOKEN}.host`);
  }

  get port(): PostgresPort {
    return Number(this.configService.get<PostgresPort>(`${TOKEN}.port`));
  }

  get user(): string {
    return this.configService.get<string>(`${TOKEN}.user`);
  }

  get password(): string {
    return this.configService.get<string>(`${TOKEN}.password`);
  }

  get database(): string {
    return this.configService.get<string>(`${TOKEN}.database`);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entities = join(__dirname, '..', '..', '..', ENTITIES_PATTERN);
    const migrations = join(__dirname, '..', '..', '..', MIGRATIONS_PATTERN);

    return {
      type: 'postgres',
      migrationsRun: true,
      synchronize: false,
      host: this.host,
      port: this.port,
      username: this.user,
      password: this.password,
      database: this.database,
      entities: [entities],
      migrations: [migrations],
      cli: { migrationsDir: 'src/migrations' },
      logging: true,
      logger: 'advanced-console',
    };
  }
}