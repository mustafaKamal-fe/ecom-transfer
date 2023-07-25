import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppCustomException } from '@common/common/exceptions/custom-exception';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto) {
    let province: Prisma.ProvinceCreateInput; // Province payload

    // Create province with city
    if (createProvinceDto.cityId) {
      province = {
        deleviryFee: createProvinceDto.deleviryFee,
        deleviryTime: createProvinceDto.deleviryTime,
        name: createProvinceDto.name,
        city: {
          connect: {
            id: createProvinceDto.cityId,
          },
        },
      };
    } else {
      // Create province without city
      province = {
        deleviryFee: createProvinceDto.deleviryFee,
        deleviryTime: createProvinceDto.deleviryTime,
        name: createProvinceDto.name,
      };
    }

    // Create province
    await this.prisma.province.create({
      data: province,
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
    // Check if the name is duplicated
    const duplicated = await this.prisma.province.findUnique({
      where: {
        name: updateProvinceDto.name,
      },
    });

    if (duplicated) {
      throw new AppCustomException('provinceNameDuplicated');
    }

    // Update the province
    let province: Prisma.ProvinceUpdateInput;

    // Update province with city
    if (updateProvinceDto.cityId) {
      province = {
        name: updateProvinceDto.name,
        deleviryFee: updateProvinceDto.deleviryFee,
        deleviryTime: updateProvinceDto.deleviryTime,
        city: {
          connect: {
            id: updateProvinceDto.cityId,
          },
        },
      };
    } else {
      // Update province without city
      province = {
        name: updateProvinceDto.name,
        deleviryFee: updateProvinceDto.deleviryFee,
        deleviryTime: updateProvinceDto.deleviryTime,
      };
    }

    return await this.prisma.province.update({
      where: {
        id,
      },
      data: province,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} province`;
  // }
}
