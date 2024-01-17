import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('books')
export class BooksController {
  constructor (private readonly booksService: BooksService) {

  }

  // GET /books
  @Get()
  getAllBooks() { 
    return this.booksService.getAllBooks();
  }

  @Post('place-order')
  placeOrder(@Body() items: PlaceOrderDto[]) {
    return this.booksService.placeOrder(items);
  }

  // // GET /books/:id
  // @Get(':id')
  // getBookDetails(@Param('id') id: string) {
  //   return id;
  // }

  // // GET /books?type=one
  // @Get()
  // queryApi(@Query('type') type: string) {
  //   return type;
  // }

  


}
