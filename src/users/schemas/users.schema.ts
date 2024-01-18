import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({})
export class User {
  
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  orders: {
    amount: number;
    items: {
      _id: string;
      title: string;
      author: string;
      unitPrice: number;
      quantity: number;
    }[];
    timestamp: string;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);