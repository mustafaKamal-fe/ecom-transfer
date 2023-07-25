import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from '@common/common/exceptions/custom-exception.filter';
import {
  CustomAppErrorDto,
  ValdiationErrorDto,
} from '@common/common/exceptions/exceptions.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
      transform: true,
    }),
  );

  // Add global exception filter
  app.useGlobalFilters(new AppExceptionFilter());

  // Swagger
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
    .addTag(
      'City',
      `City is used to store and manage provinces. Cities are used to manage addresses.`,
    )
    .addTag(
      'Province',
      `Province is used to store and manage provinces. Provinces are used to manage addresses.`,
    )
    .addTag('Profile', `Profile is used to store user's personal information.`)
    .addTag(
      'Wallet',
      `Wallet is used to store money for a user. Currently when a user account is created, an empty wallet is created for the user.`,
    )
    .addTag(
      'Wallet Transaction',
      `Wallet transaction is used to store wallet transactions.`,
    )

    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ValdiationErrorDto, CustomAppErrorDto],
  });
  SwaggerModule.setup('api', app, document);

  // Start app
  console.log('http://localhost:3000/api');
  await app.listen(3000);
}
void bootstrap();
