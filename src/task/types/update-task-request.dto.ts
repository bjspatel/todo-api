import { ApiProperty } from '@nestjs/swagger';
import { TaskProgress } from './task.dto';

export class UpdateTaskRequestDto {
  @ApiProperty({
    description: 'The name of the Task',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'true, if the Task is done, false otherwise',
    type: Boolean,
  })
  isDone: boolean;

  @ApiProperty({
    description: 'The name of the Task',
    type: Number,
    enum: [0, 25, 50, 75, 100],
  })
  progress: TaskProgress;

  @ApiProperty({
    description: 'The due date of the Task',
    type: Number,
  })
  dueAt: number;
}
