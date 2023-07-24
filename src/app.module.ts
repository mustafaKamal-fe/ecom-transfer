import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { UsersModule } from './users/users.module';
import { MilisearchModule } from './milisearch/milisearch.module';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { MilisearchModule } from './milisearch/milisearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    AttachmentsModule,
    UsersModule,
    MilisearchModule,
    ShopsModule,
    ProductsModule,
  ],
})
export class AppModule {}
