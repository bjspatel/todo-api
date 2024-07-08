import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/types/user.dto';
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

  async login(requestDto: LogInRequestDto): Promise<AuthDto> {
    const { email, password } = requestDto;
    const user = await this.userModel.findOne({
      email,
    });
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    console.log('User ', user, 'Payload ', payload, 'Token ', token);
    return {
      token,
    };
  }

  async getMe(userId: string): Promise<UserDto> {
    const user = await this.userModel.findById(userId);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
