import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppCustomException } from '@common/common/exceptions/custom-exception';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto) {
    const { name, deleviryFee, deleviryTime } = createProvinceDto;
    await this.prisma.province.create({
      data: {
        name,
        deleviryFee,
        deleviryTime,
      },
    });
  }

  async findAll() {
    return await this.prisma.province.findMany({
      select: {
        name: true,
        deleviryFee: true,
        deleviryTime: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.province.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        deleviryFee: true,
        deleviryTime: true,
      },
    });
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto) {
    const { name, deleviryFee, deleviryTime } = updateProvinceDto;
    // Check if the name is duplicated
    const duplicated = await this.prisma.province.findUnique({
      where: {
        name,
      },
    });

    if (duplicated) {
      throw new AppCustomException('provinceNameDuplicated');
    }

    // Create the province
    return this.prisma.province.update({
      where: {
        id,
      },
      data: {
        name,
        deleviryFee,
        deleviryTime,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} province`;
  // }
}
