import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('[Bis2Bis E-commerce] - Processo Seletivo - Node.Js Developer')
    .setDescription('Backend API nestjs http://universities.hipolabs.com/')
    .setContact('Magno Carvalho dos Santos', 'https://www.linkedin.com/in/magnocarv/', 'magnocarv@hotmail.com')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: false,
    })
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
