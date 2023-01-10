import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PostgresConfigService } from '../config/db/postgres/config.service';

const PATH = 'ormconfig.json';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const config = app.get(PostgresConfigService);

  const typeOrmOptions = config.createTypeOrmOptions();

  fs.writeFileSync(PATH, JSON.stringify(typeOrmOptions, null, 2));

  return app.close();
})();