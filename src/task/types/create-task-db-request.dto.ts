import { TaskStatus } from './task.dto';

export class CreateTaskDbRequestDto {
  name: string;
  status: TaskStatus;
  userId: string;
}
