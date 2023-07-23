import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
    type: 'string',
    nullable: true,
  })
  username?: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
    type: 'string',
    format: 'email',
    nullable: true,
  })
  email?: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    type: 'string',
    format: 'password',
    nullable: true,
  })
  password?: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: 'string',
    nullable: true,
  })
  firstName?: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: 'string',
    nullable: true,
  })
  lastName?: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
] as const) {
  @ApiProperty({
    description: 'The user ID',
    example: 1,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  id: number;
}

export class UserObject {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  role: string;
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      dateOfBirth: { type: 'string' },
      mobile: { type: 'string' },
    },
  })
  profile: {
    id: number;
    dateOfBirth: string;
    mobile: string;
  };
}
