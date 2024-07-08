import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UpdateUserRequestDto } from './types/update-user-request.dto';
import { UserDto } from './types/user.dto';
import { User } from './types/user.schema';
import { UserTransformerService } from './user-transformer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly transformService: UserTransformerService,
  ) {}

  async create(requestDto: CreateUserRequestDto): Promise<UserDto> {
    const sanitizedRequest =
      this.transformService.sanitizeCreateUserRequest(requestDto);
    const user = await this.userModel.findOne({
      email: sanitizedRequest.email,
    });
    if (user) {
      throw new UnprocessableEntityException('User already exists');
    }
    sanitizedRequest.password = await bcrypt.hash(
      sanitizedRequest.password,
      10,
    );
    const createdUser = await this.userModel.create(sanitizedRequest);
    return this.transformService.toUserDto(createdUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find();
    return users.map((user) => this.transformService.toUserDto(user));
  }

  async findOne(userId: string): Promise<UserDto> {
    const user = await this.userModel.findById(userId);
    return this.transformService.toUserDto(user);
  }

  async update(
    userId: string,
    requestDto: UpdateUserRequestDto,
  ): Promise<UserDto> {
    const sanitizedRequest =
      this.transformService.sanitizeUpdateUserRequest(requestDto);
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      sanitizedRequest,
      { new: true },
    );
    return this.transformService.toUserDto(user);
  }
}
