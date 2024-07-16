import { Injectable } from '@nestjs/common';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UpdateUserRequestDto } from './types/update-user-request.dto';
import { UserDto } from './types/user.dto';
import { UserDocument } from './types/user.schema';

@Injectable()
export class UserTransformerService {
  constructor() {}
  toUserDto(user: UserDocument): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      about: user.about,
    };
  }
  sanitizeCreateUserRequest(
    createUserRequestDto: CreateUserRequestDto,
  ): CreateUserRequestDto {
    return {
      email: createUserRequestDto.email,
      password: createUserRequestDto.password,
      name: createUserRequestDto.name,
      avatar: createUserRequestDto.avatar,
    };
  }

  sanitizeUpdateUserRequest(
    updateUserRequestDto: UpdateUserRequestDto,
  ): UpdateUserRequestDto {
    const sanitizedRequest: UpdateUserRequestDto = {};
    if (updateUserRequestDto.name) {
      sanitizedRequest.name = updateUserRequestDto.name;
    }
    if (updateUserRequestDto.email) {
      sanitizedRequest.email = updateUserRequestDto.email;
    }
    if (updateUserRequestDto.avatar) {
      sanitizedRequest.avatar = updateUserRequestDto.avatar;
    }
    if (updateUserRequestDto.about) {
      sanitizedRequest.about = updateUserRequestDto.about;
    }

    return sanitizedRequest;
  }
}
