import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../dto/create-profile.dto';

export class ProfileEntity {
  id: number;

  @ApiProperty({
    description: 'The date of birth of the user',
    example: '1990-01-01',
    type: 'string',
  })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '0771234567',
    type: 'string',
    format: 'mobile',
  })
  mobile: string;

  @ApiProperty({
    type: String,
    description: 'Gender type',
    enum: Gender,
  })
  gender: string;

  @ApiProperty({
    description: 'The address id of the user',
    example: 1,
    type: 'number',
    nullable: false,
  })
  addressId: number;

  @ApiProperty({
    description: 'The user id of the user',
    example: 1,
    type: 'number',
    nullable: false,
  })
  userId: number;
}
