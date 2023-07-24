import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // Create user
    return this.prisma.user.create({
      data: {
        ...data,
        // Initial empty wallet
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
