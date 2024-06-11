import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email address of the user',
  })
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long.',
  })
  @ApiProperty({
    example: 'password',
    description: 'User password',
    minLength: 6,
  })
  password: string;
}
