import { UserId } from 'src/decorators/user-id.decorator';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';
import { CreateTaskRequestDto } from './types/create-task-request.dto';
import { UpdateTaskRequestDto } from './types/update-task-request.dto';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @UserId() userId,
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ) {
    return this.taskService.create(userId, createTaskRequestDto);
  }

  @Get()
  async findAll(@UserId() userId) {
    return this.taskService.findAll(userId);
  }

  @Put(':id')
  async update(
    @UserId() userId,
    @Param('id') taskId: string,
    @Body() updateTaskRequestDto: UpdateTaskRequestDto,
  ) {
    return this.taskService.update(userId, taskId, updateTaskRequestDto);
  }

  @Delete(':id')
  async delete(@UserId() userId, @Param('id') taskId: string) {
    return this.taskService.delete(taskId, userId);
  }
}
