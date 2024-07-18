import { Request, Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LogInRequestDto } from './types/login-request.dto';
import { UserId } from 'src/decorators/user-id.decorator';

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
    const authDto = await this.authService.login(requestDto);
    res.cookie('refreshToken', authDto.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.send(authDto);
  }

  @Public()
  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      return res.status(400).json({ message: 'No refresh token found' });
    }
    const authDto = await this.authService.refreshToken(oldRefreshToken);
    res.cookie('refreshToken', authDto.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.send(authDto);
  }

  @Put('password')
  async updatePassword(
    @UserId() userId: string,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.updatePassword(
      userId,
      currentPassword,
      newPassword,
    );
  }

  @Public()
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken');
    res.send(true);
  }
}
