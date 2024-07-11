import { UserId } from 'src/decorators/user-id.decorator';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';
import { CreateTaskRequestDto } from './types/create-task-request.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Implement the create method
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

  @Delete(':id')
  async delete(@UserId() userId, @Param('id') taskId: string) {
    return this.taskService.delete(taskId, userId);
  }
}
