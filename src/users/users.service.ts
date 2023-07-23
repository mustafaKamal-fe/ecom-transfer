import { AppCustomException } from '@common/common/exceptions/custom-exception';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    // Check if email is already registered
    if (data.email) {
      const isEmailExists = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (isEmailExists) {
        throw new AppCustomException('emailAlreadyExists');
      }
    }

    // Check if username is already registered
    if (data.username) {
      const isUsernameExists = await this.prisma.user.findUnique({
        where: { username: data.username },
      });
      if (isUsernameExists) {
        throw new AppCustomException('usernameAlreadyExists');
      }
    }

    // Create user
    return this.prisma.user.create({
      data: {
        ...data,
        role: data.role || 'customer',
        wallet: {
          create: {
            amount: 0,
          },
        },
      },
    });
  }
  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(id: number) {
    // TODO: add DB view to get user profile
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fname: true,
        lname: true,
        email: true,
        username: true,
        role: true,
        profile: true,
      },
    });
  }

  update(userData: UpdateUserDto) {
    const { id, firstName, lastName } = userData;
    return this.prisma.user.update({
      where: { id },
      data: {
        fname: firstName,
        lname: lastName,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
