import { Types } from 'mongoose';

import { ApiProperty } from '@nestjs/swagger';

export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'canceled';

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
    description: 'The status of the Task',
    type: String,
    enum: ['to-do', 'in-progress', 'done', 'canceled'],
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Creation date of the Task',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Update date of the Task',
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Deletion date of the Task',
    type: String,
  })
  deletedAt?: string;
}
