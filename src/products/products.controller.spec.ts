import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

const PRODUCT_1 = {
  name: 'test product',
  description: 'test description',
  price: 10,
  category: 'test category',
};

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let jwtService: JwtService;
  let productId: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async () => ({
            secret: 'MyS1cr3t',
            signOptions: { expiresIn: '60m' },
          }),
        }),
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            url: 'postgres://root:root@localhost:5432/root',
            entities: [Product],
          }),
        }),
        TypeOrmModule.forFeature([Product, User]),
      ],
      controllers: [ProductsController],
      providers: [
        JwtStrategy,
        ProductsService,
        AuthService,
        UsersService,
        ConfigService,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: async (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { username: 'testuser' };
          return true;
        },
      })
      .compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsController = module.get<ProductsController>(ProductsController);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Products', () => {
    describe('create', () => {
      it('201: should create a product', async () => {
        const createResult = await productsController.create(PRODUCT_1);
        productId = createResult.id;
        expect(createResult.id).toBeDefined();
      });
    });

    describe('findAll', () => {
      it('200: should return a list of products', async () => {
        const products = await productsController.findAll();
        expect(products).toBeInstanceOf(Array);
        expect(products.length).toBeGreaterThan(0);
      });
    });

    describe('findOne', () => {
      it('200: should return a product by id', async () => {
        const product = await productsController.findOne(productId);
        expect(product).toBeDefined();
        expect(product.id).toBe(productId);
      });

      it('404: should throw not found exception for non-existing product', async () => {
        await expect(
          productsController.findOne('0000000f-1e0b-4326-9029-1c07b2232c37'),
        ).rejects.toThrow('Product not found');
      });
    });

    describe('update', () => {
      it('200: should update a product', async () => {
        const updatedProduct = await productsController.update(productId, {
          name: 'Updated Product',
          description: 'Updated description',
          price: 20,
        });
        expect(updatedProduct.name).toBe('Updated Product');
        expect(updatedProduct.description).toBe('Updated description');
        expect(updatedProduct.price).toBe('20');
      });

      it('404: should throw not found exception for non-existing product', async () => {
        await expect(
          productsController.update('0000000f-1e0b-4326-9029-1c07b2232c37', {
            name: 'Updated Product',
            description: 'Updated description',
            price: 20,
          }),
        ).rejects.toThrow('Product not found');
      });
    });

    describe('remove', () => {
      it('200: should delete a product', async () => {
        const deleteResult = await productsController.remove(productId);
        expect(deleteResult).toBeUndefined();
      });

      it('404: should throw not found exception for non-existing product', async () => {
        await expect(
          productsController.remove('0000000f-1e0b-4326-9029-1c07b2232c37'),
        ).rejects.toThrow('Product not found');
      });
    });
  });
});
