import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserRequestDto } from './types/create-user-request.dto';
import { UserService } from './user.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
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
  @Get(':id')
  async findOne(@Param('id') userId: string) {
    return this.userService.findOne(userId);
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
