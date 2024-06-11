import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('main');

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription(
      'This is simple RESTful products API protected with JWT token authentication',
    )
    .addServer('http://localhost:8001/', 'Local environment')
    .addServer('https://task-manager-api.onrender.com', 'Production')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = config.get('API_PORT');
  await app.listen(port, () => {
    logger.log(`Server is started on PORT: ${port}`);
  });
}
bootstrap();
