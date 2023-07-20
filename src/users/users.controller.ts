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
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

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
  create(@Body() userData: Prisma.UserCreateInput) {
    return this.usersService.create(userData);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
