import { TaskProgress } from './task.dto';

export class UpdateTaskDbRequestDto {
  name: string;
  isDone: boolean;
  progress: TaskProgress;
  dueAt: number;
  updatedAt: number;
}
