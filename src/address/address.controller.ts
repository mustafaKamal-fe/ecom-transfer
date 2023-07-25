import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@common/common/exceptions/exception.decorator';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /**
   * Create a new Address record.
   *
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @apiExceptionResponse()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  // @Get()
  // findAll() {
  //   return this.addressService.findAll();
  // }

  /**
   * Get a single Address record by id.
   *
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: AddressEntity,
  })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
