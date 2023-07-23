import { PickType } from '@nestjs/swagger';
import { CreateWalletTransactionDto } from './create-wallet-transaction.dto';

export class UpdateWalletTransactionDto extends PickType(
  CreateWalletTransactionDto,
  ['amount'] as const,
) {}
