import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export type TaskProgress = 0 | 25 | 50 | 75 | 100;

export class TaskDto {
  @ApiProperty({
    description: 'The id of the Task',
    type: String,
  })
  id: Types.ObjectId;

  @ApiProperty({
    description: 'The name of the Task',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The id of the user who created the Task',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'true - if the task if done; false - otherwiser',
    type: Boolean,
  })
  isDone: boolean;

  @ApiProperty({
    description: 'The progress of the Task',
    type: Number,
    enum: [0, 25, 50, 75, 100],
  })
  progress: TaskProgress;

  @ApiProperty({
    description: 'The due date of the Task',
    type: Number,
  })
  dueAt: number;

  @ApiProperty({
    description: 'Creation date of the Task',
    type: Number,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Update date of the Task',
    type: Number,
  })
  updatedAt: number;

  @ApiProperty({
    description: 'Deletion date of the Task',
    type: Number,
  })
  deletedAt?: number;
}
