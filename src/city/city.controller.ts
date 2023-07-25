import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CityEntity } from './entities/city.entity';
import { apiExceptionResponse } from '@common/common/exceptions/exception.decorator';

@Controller('city')
@ApiTags('City')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  /**
   *
   *
   *  Create a new City record. Province ID is required to create a city. each city is unique in a province.
   *
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The city has been successfully created.',
  })
  @apiExceptionResponse()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  /**
   *  Get all City records.
   */
  // @Get()
  // @ApiOkResponse({
  //   description: 'Get All cities.',
  //   type: CityEntity,
  //   isArray: true,
  // })

  // findAll() {
  //   return this.cityService.findAll();
  // }

  /**
   * Get a City record by id.
   *
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Get a city by id.',
    type: CityEntity,
  })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  /**
   * Update a City record by id.
   *
   */
  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'City was successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cityService.remove(+id);
  // }
}
