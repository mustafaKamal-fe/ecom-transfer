/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppCustomException } from '@common/common/exceptions/custom-exception';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}
  async create(createCityDto: CreateCityDto) {
    // check if the city name is duplicated in the same province
    const duplicated = await this.prisma.city.findFirst({
      where: {
        AND: [
          {
            province: {
              id: createCityDto.provinceId,
            },
          },
          {
            name: createCityDto.name,
          },
        ],
      },
    });

    if (duplicated) {
      throw new AppCustomException('cityNameDuplicated');
    }

    // Create city (connected to province)
    return await this.prisma.city.create({
      data: {
        name: createCityDto.name,
        deleviryFee: createCityDto.deleviryFee,
        deleviryTime: createCityDto.deleviryTime,
        province: {
          connect: {
            id: createCityDto.provinceId,
          },
        },
      },
    });
  }

  // async findAll() {
  //   return await this.prisma.city.findMany({
  //     include: {
  //       province: true,
  //     },
  //   });
  // }

  async findOne(id: number) {
    return this.prisma.city.findUnique({
      where: {
        id,
      },
      include: {
        province: true,
      },
    });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    // check if the city name is duplicated in the same province
    if (updateCityDto.name && updateCityDto.provinceId) {
      const duplicated = await this.prisma.city.findFirst({
        where: {
          AND: [
            {
              province: {
                id: updateCityDto.provinceId,
              },
            },
            {
              name: updateCityDto.name,
            },
          ],
        },
      });

      if (duplicated) {
        throw new AppCustomException('cityNameDuplicated');
      }
    }

    // TODO: see in the future if we need to check if the provinceId is valid

    let city: Prisma.CityUpdateInput;
    // Update city with province
    if (updateCityDto.provinceId) {
      city = {
        name: updateCityDto.name,
        deleviryFee: updateCityDto.deleviryFee,
        deleviryTime: updateCityDto.deleviryTime,
        province: {
          connect: {
            id: updateCityDto.provinceId,
          },
        },
      };
    } else {
      // Update city without province
      city = {
        name: updateCityDto.name,
        deleviryFee: updateCityDto.deleviryFee,
        deleviryTime: updateCityDto.deleviryTime,
      };
    }

    return await this.prisma.city.update({
      where: {
        id,
      },
      data: city,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} city`;
  // }
}
