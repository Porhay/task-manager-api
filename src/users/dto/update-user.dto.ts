import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of user',
    example: 'user1',
  })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of user',
    example: 'new_password',
  })
  readonly password: string;
}
