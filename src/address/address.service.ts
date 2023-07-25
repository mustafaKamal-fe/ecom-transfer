import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  create(createAddressDto: CreateAddressDto) {
    let address: Prisma.AddressCreateInput;

    // Create address with city
    if (createAddressDto.cityId) {
      address = {
        profile: {
          connect: {
            id: createAddressDto.profileId,
          },
        },
        province: {
          connect: {
            id: createAddressDto.provinceId,
          },
        },
        city: {
          connect: {
            id: createAddressDto.cityId,
          },
        },
        street: createAddressDto.street,
        buildingNo: createAddressDto.buildingNo,
        floorNo: createAddressDto.floorNo,
        apartmentNo: createAddressDto.apartmentNo,
        latitude: createAddressDto.latitude,
        longitude: createAddressDto.longitude,
      };
    } else {
      // Create address without city
      address = {
        profile: {
          connect: {
            id: createAddressDto.profileId,
          },
        },
        province: {
          connect: {
            id: createAddressDto.provinceId,
          },
        },
        street: createAddressDto.street,
        buildingNo: createAddressDto.buildingNo,
        floorNo: createAddressDto.floorNo,
        apartmentNo: createAddressDto.apartmentNo,
        latitude: createAddressDto.latitude,
        longitude: createAddressDto.longitude,
      };
    }

    // Create address
    return this.prisma.address.create({
      data: address,
    });
  }

  // findAll() {
  //   return `This action returns all address`;
  // }

  async findOne(id: number) {
    return await this.prisma.address.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        apartmentNo: true,
        buildingNo: true,
        floorNo: true,
        street: true,
        longitude: true,
        latitude: true,
        province: {
          select: {
            name: true,
            id: true,
            city: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address: Prisma.AddressUpdateInput = {};

    // Update address with city
    if (updateAddressDto.cityId) {
      address.city = {
        connect: {
          id: updateAddressDto.cityId,
        },
      };
    }

    // Update address with province
    if (updateAddressDto.provinceId) {
      address.province = {
        connect: {
          id: updateAddressDto.provinceId,
        },
      };
    }

    // Update address
    return await this.prisma.address.update({
      where: {
        id,
      },
      data: {
        apartmentNo: updateAddressDto.apartmentNo,
        buildingNo: updateAddressDto.buildingNo,
        floorNo: updateAddressDto.floorNo,
        street: updateAddressDto.street,
        longitude: updateAddressDto.longitude,
        latitude: updateAddressDto.latitude,
        ...address,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
