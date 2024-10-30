import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class BaseSchema extends Document {
  @Prop({ default: uuidv4 }) 
  id: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}
