import { Request } from 'express';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Creates a user and respond with JWT token',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Respond with JWT token',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
