import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validate(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return decoded;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
