import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    // Check if the username already exists in the database
    const existingUser = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Create a new user if the username is not taken
    const newUser = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(newUser);
    this.logger.log(`New user created, id: ${savedUser.id}`);
    return savedUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.usersRepository.update(userId, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.logger.log(`User updated, id: ${user.id}`);
    return user;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User deleted, id: ${userId}`);
  }
}
