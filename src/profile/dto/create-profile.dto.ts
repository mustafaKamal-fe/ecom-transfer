import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsOptional,
} from 'class-validator';

enum Gender {
  male = 'male',
  female = 'female',
}

export class CreateProfileDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
    description: 'Date of birth',
    example: '1990-01-01',
    format: 'date',
    required: false,
  })
  dateOfBirth: string;
  @IsMobilePhone('ar-IQ')
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Mobile number',
    example: '07701234567',
    required: false,
  })
  mobile: string;

  @ApiProperty({
    type: String,
    description: 'Gender type',
    oneOf: [{ enum: ['male', 'female'] }],
    required: false,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Address id',
    example: 1,
    required: false,
  })
  addressId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'User Id',
    example: 1,
    required: true,
  })
  userId: number;
}
