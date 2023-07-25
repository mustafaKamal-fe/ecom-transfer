import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import Role from '@common/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { email, username, firstName, lastName, password } = data;
    // Create user
    return this.prisma.user.create({
      data: {
        wallet: {
          create: {
            amount: 0,
          },
        },
        role: Role.customer, // TODO: change to different role when authentication is implemented
        email,
        username,
        fname: firstName,
        lname: lastName,
        password, // TODO: change the way passowrds are stored after authentication is implemented
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
