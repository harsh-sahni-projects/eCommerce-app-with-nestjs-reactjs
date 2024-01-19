import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor (private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() { 
    return this.booksService.getAllBooks();
  }
}
