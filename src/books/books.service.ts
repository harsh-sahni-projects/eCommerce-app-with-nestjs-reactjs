import { Injectable } from '@nestjs/common';
import { Book } from './schemas/books.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
  ) {
    async function populateDb() {
      try {
        const books = await bookModel.find();
        if (books.length > 0) return;
 
        let allPromises = [];
        for (let i=1; i<=10; i++) { 
          let bookDetails = {
            title: 'Book ' + i + ' Title',
            author: 'Author ' + i + ' Title',
            unitPrice: 500
          }
          allPromises.push(bookModel.create(bookDetails));
        }
        await Promise.all(allPromises);
      } catch (err) { 
        throw err;
      }
    }
    populateDb();
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
}
