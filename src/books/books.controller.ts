import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { PlaceOrderDto } from '../users/dto/place-order.dto';

@Controller('books')
export class BooksController {
  constructor (private readonly booksService: BooksService) {

  }

  // GET /books
  @Get()
  getAllBooks() { 
    return this.booksService.getAllBooks();
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
