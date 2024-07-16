import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/types/user.schema';
import { UserTransformerService } from 'src/user/user-transformer.service';

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
    private readonly userTransformerService: UserTransformerService,
  ) {}

  private async getTokens(userDoc: UserDocument): Promise<AuthDto> {
    const payload = { sub: userDoc._id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '15d' }),
    ]);
    return {
      user: this.userTransformerService.toUserDto(userDoc),
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
    return this.getTokens(user);
  }

  async refreshToken(oldRefreshToken: string): Promise<AuthDto> {
    const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
      ignoreExpiration: true,
    });
    const user = await this.userModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.getTokens(user);
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    user.password = await bcrypt.hash(newPassword, 10);
    const updatedUser = await user.save();
    return this.userTransformerService.toUserDto(updatedUser);
  }
}
