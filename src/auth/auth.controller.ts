import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LogInRequestDto } from './types/login-request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body(new ValidationPipe()) requestDto: LogInRequestDto,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(requestDto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.send({ accessToken });
  }

  @Public()
  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(oldRefreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.send({ accessToken });
  }
}
