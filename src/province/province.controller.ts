import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@common/common/exceptions/exception.decorator';
import { ProvinceEntity } from './entities/province.entity';

@Controller('province')
@ApiTags('Province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  /**
   * Create a new province record. Provice names are the official iraqi province names.
   *
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The province has been successfully created.',
  })
  @apiExceptionResponse()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provinceService.create(createProvinceDto);
  }

  /**
   * Get all provinces. Provice names are the official iraqi province names and are always 18 as of 2021.
   *
   */
  @Get()
  @ApiOkResponse({
    description: 'All provinces have been successfully retrieved.',
    type: ProvinceEntity,
    isArray: true,
  })
  findAll() {
    return this.provinceService.findAll();
  }

  /**
   * Get a province by id. Provice names are the official iraqi province names and are always 18 as of 2021.
   *
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'The province has been successfully retrieved.',
    type: ProvinceEntity,
  })
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(+id);
  }

  /**
   * Update a province by id. Currently, the `delivery fee` and `delivery time` can be updated as well as `name`. Note that the name is the official iraqi province name and CAN NOT be DUPLICATED with another province.
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'The province has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.provinceService.remove(+id);
  // }
}
