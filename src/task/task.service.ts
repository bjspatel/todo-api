import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TaskTransformerService } from './task-transformer.service';
import { CreateTaskRequestDto } from './types/create-task-request.dto';
import { TaskDto } from './types/task.dto';
import { Task } from './types/task.schema';
import { UpdateTaskRequestDto } from './types/update-task-request.dto';

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
    const tasks = await this.taskModel
      .find({ userId: new Types.ObjectId(userId), deletedAt: null })
      .sort({ createdAt: -1 });
    return tasks.map(this.transformService.toTaskDtoFromDocument);
  }

  async update(
    userId: string,
    taskId: string,
    requestDto: UpdateTaskRequestDto,
  ): Promise<TaskDto> {
    console.log('Update task called with: ', userId, taskId, requestDto);
    const dbRequest =
      this.transformService.sanitizeUpdateTaskRequestDto(requestDto);
    const updatedDbTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      dbRequest,
      { new: true },
    );
    return this.transformService.toTaskDtoFromDocument(updatedDbTask);
  }

  async delete(taskId: string, userId: string) {
    const query = {
      _id: new Types.ObjectId(taskId),
      userId: new Types.ObjectId(userId),
    };
    const deleteResult = await this.taskModel.findOneAndUpdate(query, {
      deletedAt: Date.now(),
    });
    console.log('Delete result: ', query, deleteResult);
  }
}
