import { Injectable } from '@nestjs/common';

import { CreateTaskDbRequestDto } from './types/create-task-db-request.dto';
import { TaskDto } from './types/task.dto';

@Injectable()
export class TaskTransformerService {
  constructor() {}

  sanitizeCreateTaskRequestDto(
    userId: string,
    createTaskRequestDto: any,
  ): CreateTaskDbRequestDto {
    return {
      name: createTaskRequestDto.name,
      status: createTaskRequestDto.status,
      userId: userId,
    };
  }

  toTaskDtoFromDocument(document: any): TaskDto {
    return {
      id: document._id,
      userId: document.userId,
      name: document.name,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
