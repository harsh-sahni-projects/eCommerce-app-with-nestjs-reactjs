export class PlaceOrderDto {
  amount: number;
  items: {
    _id: string;
    title: string;
    author: string;
    unitPrice: number;
    quantity: number;
  }[];
  timestamp: string;
}