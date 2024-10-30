import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema()
export class Users extends BaseSchema {
  
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, nullable: false})
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
