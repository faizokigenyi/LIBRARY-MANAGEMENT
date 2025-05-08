import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../book.entity';
import { CreateBookDto } from '../dtos/create-book-dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenresService } from 'src/genres/providers/genres.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @Inject(GenresService)
    private readonly genresService: GenresService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  public async createBook(createBookDto: CreateBookDto) {
    // get the id of user from createBookDto
    const { authorId, ...bookData } = createBookDto;
    // check for the authorId is in users Db, check again if they are authors
    const author = await this.usersService.getUserById(authorId);
    // check for the genres
    const genres = await this.genresService.getMultipleGenres(
      createBookDto.genres,
    );

    console.log('genres', genres);

    // check if the book already exists
    const existingBook = await this.bookRepository.findOne({
      where: { isbn: bookData.isbn },
    });

    if (existingBook) {
      throw new UnauthorizedException('Book already exists');
    } else {
      // create a new book
      const newBook = this.bookRepository.create({
        ...bookData,
        author,
        genres,
      });
      // save the book to the database
      return await this.bookRepository.save(newBook);
    }
  }

  public async getBookById(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }
}
