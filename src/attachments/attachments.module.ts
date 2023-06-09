import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bullmq';
import { imgOptmizerConsumer } from './imgopt-Consumer';
import { multerStorage } from './storage/storage-config';

@Module({
  imports: [
    MulterModule.register(multerStorage),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    BullModule.registerQueue({
      name: 'img-optimization',
    }),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, imgOptmizerConsumer],
})
export class AttachmentsModule {}
