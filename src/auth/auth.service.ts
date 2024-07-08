import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/types/user.schema';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { AuthDto } from './types/auth.dto';
import { LogInRequestDto } from './types/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async getTokens(userId: Types.ObjectId): Promise<AuthDto> {
    const payload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '15d' }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(requestDto: LogInRequestDto): Promise<AuthDto> {
    const { email, password } = requestDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    return this.getTokens(user._id);
  }

  async refreshToken(oldRefreshToken: string): Promise<AuthDto> {
    const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
      ignoreExpiration: true,
    });
    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.getTokens(user._id);
  }
}
