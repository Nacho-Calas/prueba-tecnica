import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';


@Schema()
export class Movies extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  episode_id: number;

  @Prop({ required: true })
  opening_crawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ type: [String], required: true })
  characters: string[];

  @Prop({ type: [String], required: true })
  planets: string[];

  @Prop({ type: [String], required: true })
  starships: string[];

  @Prop({ type: [String], required: true })
  vehicles: string[];

  @Prop({ type: [String], required: true })
  species: string[];

  @Prop({ required: true })
  created: string;

  @Prop({ required: true })
  edited: string;

  @Prop({ required: true })
  url: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
