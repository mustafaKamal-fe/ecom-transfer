import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@common/common/exceptions/exception.decorator';
import { UserObject } from './entity/UserObject.entity';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   *
   * Create a new user in the system with the given data. The user is created with the default role of Customer.
   *
   */
  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'User was created successfully.',
  })
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the user with the given id.',
    type: UserObject,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update user record. Currently only `First Name` & `Last Name` can be updated.
   *
   */
  @Patch()
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'User was updated successfully.',
  })
  update(@Body() userData: UpdateUserDto) {
    return this.usersService.update(userData);
  }

  /**
   * Remove user record from the system.
   *
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
