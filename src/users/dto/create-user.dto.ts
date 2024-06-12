import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user1',
    required: true,
  })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long.',
  })
  @IsNotEmpty()
  @ApiProperty({
    example: '123123',
    required: true,
  })
  password: string;
}
