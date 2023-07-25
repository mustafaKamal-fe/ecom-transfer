import { ApiProperty } from '@nestjs/swagger';

export class CityEntity {
  @ApiProperty({
    description: 'City name',
    example: 'Mansour',
  })
  name: string;

  @ApiProperty({
    description: 'Delivery fee.',
    format: 'decimal',
    example: 10.5,
  })
  deleviryFee: number;

  @ApiProperty({
    description: 'Delivery time in days.',
    format: 'int',
    example: 2,
  })
  deleviryTime: number;
}
