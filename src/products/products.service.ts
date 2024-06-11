import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ id: Product['id'] }> {
    const product = new Product(createProductDto);
    await this.productsRepository.save(product);
    this.logger.log(`New product created, id: ${product.id}`);
    return { id: product.id };
  }

  async findAll() {
    return this.productsRepository.find();
  }

  async findOne(productId: string) {
    const product = await this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(productId, updateProductDto);
    const updatedProduct = await this.productsRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    this.logger.log(`Product updated, id: ${updatedProduct.id}`);
    return updatedProduct;
  }

  async remove(productId: string) {
    const result = await this.productsRepository.delete(productId);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    this.logger.log(`Product deleted, id: ${productId}`);
  }
}
