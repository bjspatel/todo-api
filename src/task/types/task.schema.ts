import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TaskProgress } from './task.dto';

@Schema()
export class Task {
  @Prop({
    required: true,
  })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  isDone: boolean;

  @Prop({
    required: true,
    type: Number,
    enum: [0, 25, 50, 75, 100],
    default: 0,
  })
  progress: TaskProgress;

  @Prop({
    required: false,
  })
  dueAt: number;

  @Prop({
    required: false,
    default: Date.now,
  })
  createdAt: number;

  @Prop({
    required: false,
    default: Date.now,
  })
  updatedAt: number;

  @Prop({
    required: false,
  })
  deletedAt: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = HydratedDocument<Task>;
