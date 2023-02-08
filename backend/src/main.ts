import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { GlobalHttpExceptionFilter } from './global-definitions/filters/global-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Test task API')
    .setDescription('The test task API description')
    .setVersion('1.0')
    .addTag('Test task')
    .addApiKey({type: 'apiKey', name: 'X-API-KEY', in: 'header'}, 'X-API-KEY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(appConfigService.port);
}
bootstrap();
