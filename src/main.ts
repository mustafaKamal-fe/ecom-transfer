import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Ecommerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag(
      'User',
      `System User management where all system parties are managed.
       The system parties are: Admin, Customer, Seller, Delivery Person, etc. The system parties are managed by the admin user. The admin user is created by the system when the system is installed. The admin user can create other users and assign roles to them.
    `,
    )

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('http://localhost:3000/api');
  await app.listen(3000);
}
void bootstrap();
