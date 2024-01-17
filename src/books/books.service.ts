import { Injectable } from '@nestjs/common';
import { PlaceOrderDto } from './dto/place-order.dto';

@Injectable()
export class BooksService {
  private allBooks = [
    {
      id: 0,
      name: "Think & Grow Rich",
      unitPrice: 350
    },
    {
      id: 1,
      name: "The Man Who Sold His Ferrari",
      unitPrice: 400
    },
    {
      id: 2,
      name: "The Richest Man in Babylon",
      unitPrice: 290
    }
  ];

  getAllBooks() {
    return this.allBooks;
  }

  placeOrder(items: PlaceOrderDto[]) {
    console.log('Order placed with items:', items);
    return {
      status: 'Order placed',
      items
    }
  }
}
