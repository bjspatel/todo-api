import { TaskProgress } from './task.dto';

export class CreateTaskDbRequestDto {
  name: string;
  progress: TaskProgress;
  dueAt: number;
  userId: string;
}
