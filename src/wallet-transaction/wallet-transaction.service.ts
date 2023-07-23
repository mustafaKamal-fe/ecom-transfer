import { Injectable } from '@nestjs/common';
// import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletTransactionService {
  constructor(private prisma: PrismaService) {}
  // create(createWalletTransactionDto: CreateWalletTransactionDto) {
  //   return 'This action adds a new walletTransaction';
  // }

  // findAll() {
  //   return `This action returns all walletTransaction`;
  // }

  findOne(id: number) {
    return this.prisma.walletTransaction.findUnique({
      where: { id },
    });
  }

  update(id: number, updateWalletTransactionDto: UpdateWalletTransactionDto) {
    return this.prisma.walletTransaction.update({
      where: { id },
      data: updateWalletTransactionDto,
    });
  }

  remove(id: number) {
    return this.prisma.walletTransaction.delete({
      where: { id },
    });
  }
}
