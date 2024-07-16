import { Public } from 'src/decorators/public.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserService } from './user.service';
import { UpdateUserRequestDto } from './types/update-user-request.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body(new ValidationPipe()) requestDto: CreateUserRequestDto) {
    return this.userService.create(requestDto);
  }

  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get('me')
  async getMe(@UserId() userId: string) {
    return this.userService.findOne(userId);
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @ApiBearerAuth()
  @Put('me')
  async updateMe(
    @UserId() userId: string,
    @Body(new ValidationPipe()) requestDto: UpdateUserRequestDto,
  ) {
    return this.userService.update(userId, requestDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body(new ValidationPipe()) requestDto: CreateUserRequestDto,
  ) {
    return this.userService.update(userId, requestDto);
  }
}
