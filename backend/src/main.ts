import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('ZPF Ministries API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth() // Optional for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/api`);
}

bootstrap();