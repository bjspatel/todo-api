import { Injectable } from '@nestjs/common';

import { CreateTaskDbRequestDto } from './types/create-task-db-request.dto';
import { TaskDto } from './types/task.dto';
import { CreateTaskRequestDto } from './types/create-task-request.dto';
import { UpdateTaskRequestDto } from './types/update-task-request.dto';
import { UpdateTaskDbRequestDto } from './types/update-tas-db-request.dto';

@Injectable()
export class TaskTransformerService {
  constructor() {}

  sanitizeCreateTaskRequestDto(
    userId: string,
    createTaskRequestDto: CreateTaskRequestDto,
  ): CreateTaskDbRequestDto {
    return {
      name: createTaskRequestDto.name,
      userId: userId,
      progress: createTaskRequestDto.progress,
      dueAt: createTaskRequestDto.dueAt,
    };
  }

  sanitizeUpdateTaskRequestDto(
    updateTaskRequestDto: UpdateTaskRequestDto,
  ): UpdateTaskDbRequestDto {
    const sanitizedRequest: UpdateTaskDbRequestDto = {
      name: updateTaskRequestDto.name,
      isDone: updateTaskRequestDto.isDone,
      progress: updateTaskRequestDto.progress,
      dueAt: updateTaskRequestDto.dueAt,
      updatedAt: Date.now(),
    };

    return sanitizedRequest;
  }

  toTaskDtoFromDocument(document: any): TaskDto {
    return {
      id: document._id,
      userId: document.userId,
      name: document.name,
      isDone: document.isDone,
      progress: document.progress,
      dueAt: document.dueAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
