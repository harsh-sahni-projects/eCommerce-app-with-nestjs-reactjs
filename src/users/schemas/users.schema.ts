import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
export class User {
  
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  orders: {
    title: string,
    author: string,
    unitPrice: number,
    quantity: number
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);