import Role from '@common/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
    type: 'string',
    nullable: false,
  })
  username: string;

  @IsEmail()
  @IsOptional()
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
    nullable: false,
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: 'string',
    nullable: false,
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: 'string',
    nullable: false,
  })
  lastName: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    enum: Role,
    enumName: 'Role',
    type: 'string',
    nullable: false,
  })
  @IsEnum(Role)
  role: Role = Role.admin;
}
