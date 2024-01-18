import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
export class Book {
  
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  unitPrice: number;

}

export const BookSchema = SchemaFactory.createForClass(Book);