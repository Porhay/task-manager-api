import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product XYZ',
    required: false,
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the product',
    example: 'This is a product description example.',
    required: false,
  })
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Price of the product',
    example: 19.99,
    required: false,
  })
  readonly price?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Category of the product',
    example: 'General',
    required: false,
  })
  readonly category?: string;
}
