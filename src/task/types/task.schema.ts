import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

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
    type: String,
    enum: ['to-do', 'in-progress', 'done', 'canceled'],
    default: 'todo',
  })
  status: string;

  @Prop({
    required: false,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    required: false,
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    required: false,
  })
  deletedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = HydratedDocument<Task>;
