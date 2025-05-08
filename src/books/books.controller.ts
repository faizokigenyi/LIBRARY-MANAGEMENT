import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book-dto';
import { BooksService } from './providers/books.service';

@Controller('books')
export class BooksController {
  constructor(
    // inject the book service here
    private readonly booksService: BooksService,
  ) {}

  //   create a book

  @Post()
  public async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.booksService.createBook(createBookDto);
  }
}
