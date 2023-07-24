import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppCustomException } from '@common/common/exceptions/custom-exception';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async create(createProfileDto: CreateProfileDto) {
    // check if user id is provided.
    const { userId } = createProfileDto;
    if (!userId) {
      throw new AppCustomException('userNotProvided');
    }

    // check if user exists.
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new AppCustomException('userNotProvided');
    }

    // check if user already has a profile.
    if (user.profile) {
      throw new AppCustomException('userAlreadyHasProfile');
    }

    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  findOne(id: number) {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`;
  // }
}
