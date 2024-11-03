import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseDocument } from './base.schema';
import { Role } from '../enums/role.enum';

@Schema()
export class Users extends BaseDocument {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, nullable: false })
  password: string;

  @Prop({ default: [Role.USER], type: [{ type: String, enum: Role }] })
  role: Role[];
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
