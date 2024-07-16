import { ApiProperty } from '@nestjs/swagger';
import { TaskProgress } from './task.dto';

export class CreateTaskRequestDto {
  @ApiProperty({
    description: 'The name of the Task',
    type: String,
  })
  name: string;

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
