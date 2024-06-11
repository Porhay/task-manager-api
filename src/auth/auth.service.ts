import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    const dbUser = await this.usersService.create(user);

    // generate jwt token
    const payload = { email: dbUser.email, userId: dbUser.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken: accessToken };
  }

  async login(user: UserDocument) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async validateToken(token: string) {
    return this.jwtService.verify(token);
  }
  private async signToken(payload: { email: string; userId: string }) {
    return this.jwtService.sign(payload);
  }
}
