import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Team plan',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'All features included',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 9.99,
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'plan|quota',
    required: true,
  })
  @IsString()
  category: string;
}
