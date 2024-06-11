import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Product } from './src/products/entities/product.entity';
import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow('DATABASE_URL'),
  migrations: ['migrations/**'],
  entities: [Product, User],
});
