import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            url: 'postgres://root:root@localhost:5432/root',
            entities: [User],
          }),
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('Users', () => {
    describe('findOne', () => {
      it('200: Should return a user', async () => {
        // create a new user in db
        const newUser = await usersService.create({
          username: 'user_11',
          password: 'password',
        });

        const findOneResult = await usersController.findOne(newUser.id);
        expect(findOneResult.username).toBe(newUser.username);
        expect(findOneResult.id).toBe(findOneResult.id);

        await usersService.remove(newUser.id); // delete the user from db
      });
    });

    describe('remove', () => {
      it('200: Should return a user', async () => {
        // create a new user in db
        const newUser = await usersService.create({
          username: 'user_15',
          password: 'password',
        });

        await usersController.remove(newUser.id);

        expect(await usersService.findOne(newUser.id)).toBe(null);
      });
    });
  });
});
