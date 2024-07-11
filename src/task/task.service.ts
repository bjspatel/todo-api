import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TaskTransformerService } from './task-transformer.service';
import { CreateTaskRequestDto } from './types/create-task-request.dto';
import { TaskDto } from './types/task.dto';
import { Task } from './types/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly transformService: TaskTransformerService,
  ) {}

  async create(
    userId: string,
    requestDto: CreateTaskRequestDto,
  ): Promise<TaskDto> {
    const dbRequest = this.transformService.sanitizeCreateTaskRequestDto(
      userId,
      requestDto,
    );
    const createdDbTask = await this.taskModel.create(dbRequest);
    return this.transformService.toTaskDtoFromDocument(createdDbTask);
  }

  async findAll(userId: string): Promise<TaskDto[]> {
    const tasks = await this.taskModel.find({ userId }).sort({ createdAt: -1 });
    return tasks.map(this.transformService.toTaskDtoFromDocument);
  }

  async delete(taskId: string, userId: string) {
    this.taskModel.findOneAndDelete({ _id: taskId, userId });
  }
}
