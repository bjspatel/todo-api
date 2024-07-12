import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './task.dto';

export class CreateTaskRequestDto {
  @ApiProperty({
    description: 'The name of the Task',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The name of the Task',
    type: String,
    enum: ['to-do', 'in-progress', 'done', 'canceled'],
  })
  status: TaskStatus;
}
