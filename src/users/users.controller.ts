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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { apiExceptionResponse } from '@common/common/exceptions/exception.decorator';
import { CreateUserDto, UpdateUserDto, UserObject } from './dto';

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
    description: 'The user has been successfully created.',
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() userData: Prisma.UserCreateInput) {
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
  @ApiBody({ type: UpdateUserDto })
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
