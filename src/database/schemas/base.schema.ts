import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class BaseDocument {

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;

}
