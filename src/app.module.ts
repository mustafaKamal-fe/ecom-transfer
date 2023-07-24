import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
import { ProfileModule } from './profile/profile.module';
import { MilisearchModule } from './milisearch/milisearch.module';
import { MilisearchModule } from './milisearch/milisearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    AttachmentsModule,
    UsersModule,
    WalletModule,
    WalletTransactionModule,
    ProfileModule,
    MilisearchModule,
  ],
})
export class AppModule {}
