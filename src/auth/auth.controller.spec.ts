import { Test } from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConflictException, ExecutionContext } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

const USER_1 = {
  username: 'user_6',
  password: '123456',
};

describe('AuthController', () => {
  let userId: string;
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

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
            entities: [User],
          }),
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController, AuthController],
      providers: [UsersService, AuthService, JwtStrategy, ConfigService],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({
        canActivate: async (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = USER_1; // Mocking user in request
          return true;
        },
      })
      .compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);

    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });
  describe('Auth', () => {
    describe('register', () => {
      it('201: should generate jwt token for new users', async () => {
        const registerResult = await authController.register(USER_1);
        const verifiedObj = jwtService.verify(registerResult.access_token);
        expect(registerResult.access_token).toBeDefined();
        expect(Object.keys(verifiedObj).includes('userId'));
        userId = verifiedObj.userId;
      });

      it('409: should throw already exist status code for the same user', async () => {
        await expect(authController.register(USER_1)).rejects.toThrow(
          ConflictException,
        );
      });
    });

    describe('login', () => {
      it('200: should generate jwt token for existing users', async () => {
        const req = {
          user: USER_1,
          body: { username: USER_1.username, password: USER_1.password },
        } as any;
        const loginResult = await authController.login(req);
        const verifiedObj = jwtService.verify(loginResult.access_token);
        expect(loginResult.access_token).toBeDefined();
        expect(Object.keys(verifiedObj).includes('userId'));
        await usersService.remove(userId); // delete the user from db
      });
    });
  });
});
