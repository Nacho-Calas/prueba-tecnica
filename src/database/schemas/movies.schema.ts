import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './base.schema';

@Schema()
export class Movies extends BaseDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  episode_id: number;

  @Prop({ required: false })
  opening_crawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: false })
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ type: [String], required: false })
  characters: string[];

  @Prop({ type: [String], required: false })
  planets: string[];

  @Prop({ type: [String], required: false })
  starships: string[];

  @Prop({ type: [String], required: false })
  vehicles: string[];

  @Prop({ type: [String], required: false })
  species: string[];

  @Prop({ required: false })
  url: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
