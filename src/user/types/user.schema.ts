import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
  })
  avatar: string;

  @Prop({
    required: false,
  })
  about: string;

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

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
