import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BaseDocument = BaseSchema & Document;

@Schema()
export class BaseSchema {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  markAsDeleted() {
    this.isDeleted = true;
    this.updatedAt = new Date();
  }
}

export const BaseSchemaFactory = SchemaFactory.createForClass(BaseSchema);
