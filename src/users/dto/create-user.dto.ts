import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user1',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123123',
    required: true,
  })
  password: string;
}
