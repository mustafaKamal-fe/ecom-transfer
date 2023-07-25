import { ProvinceEnum } from '@common/common/enums/province.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsInt } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty({
    description: 'Province name',
    example: 'Baghdad',
    enum: ProvinceEnum,
    required: true,
    isArray: false,
  })
  @IsEnum(ProvinceEnum)
  name: string;

  @ApiProperty({
    description: 'Delivery fee',
    example: 1000,
    required: true,
    format: 'decimal',
  })
  @IsDecimal()
  deleviryFee: number;

  @ApiProperty({
    description: 'Delivery time in days',
    example: 2,
    required: true,
    format: 'int',
  })
  @IsInt()
  deleviryTime: number;
}
