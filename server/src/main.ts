import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: 'http://localhost:3000', // разрешаем запросы с фронтенда
      credentials: true, // разрешаем отправку куков
    }
  );
  const config = new DocumentBuilder()
    .setTitle('Blog example')
    .setDescription('The Blog API testing and working!')
    .setVersion('1.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  app.use(cookieParser())
  await app.listen(3001);
}
bootstrap();
