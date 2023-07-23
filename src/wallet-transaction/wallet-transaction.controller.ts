import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletTransactionService } from './wallet-transaction.service';
// import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('wallet-transaction')
@ApiTags('Wallet Transaction')
export class WalletTransactionController {
  constructor(
    private readonly walletTransactionService: WalletTransactionService,
  ) {}

  // @Post()
  // create(@Body() createWalletTransactionDto: CreateWalletTransactionDto) {
  //   return this.walletTransactionService.create(createWalletTransactionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.walletTransactionService.findAll();
  // }

  /**
   * Get wallet transaction by id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletTransactionService.findOne(+id);
  }

  /**
   *  Update wallet transaction by id. Only status can be updated.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletTransactionDto: UpdateWalletTransactionDto,
  ) {
    return this.walletTransactionService.update(
      +id,
      updateWalletTransactionDto,
    );
  }

  /**
   *
   * Remove wallet transaction by id.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletTransactionService.remove(+id);
  }
}
