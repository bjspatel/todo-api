import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserTransformerService } from './user-transformer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './types/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserTransformerService],
})
export class UserModule {}
