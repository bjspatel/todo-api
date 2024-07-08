import { Public } from 'src/decorators/public.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LogInRequestDto } from './types/login-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) requestDto: LogInRequestDto) {
    return this.authService.login(requestDto);
  }

  @ApiBearerAuth()
  @Get('me')
  async me(@UserId() userId: string) {
    return this.authService.getMe(userId);
  }
}
