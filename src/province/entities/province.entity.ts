import { ProvinceEnum } from '@common/common/enums/province.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ProvinceEntity {
  @ApiProperty({
    description: 'Province name',
    enum: ProvinceEnum,
    isArray: false,
  })
  name: string;

  @ApiProperty({
    description: 'Delivery fee.',
    format: 'decimal',
  })
  deleviryFee: number;

  @ApiProperty({
    description: 'Delivery time in days.',
    format: 'int',
  })
  deleviryTime: number;
}
