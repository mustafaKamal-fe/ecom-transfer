import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './CreateUserDto';

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
