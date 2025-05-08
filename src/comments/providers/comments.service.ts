import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dtos/create-comment-dto';
import { UsersService } from 'src/users/providers/users.service';
import { BooksService } from 'src/books/providers/books.service';

@Injectable()
export class CommentsService {
  constructor(
    // inject Repositories
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    // SERVICES
    // inject usersService
    private readonly usersService: UsersService,
    // inject books service
    private readonly booksService: BooksService,
  ) {}

  public async createComment(createCommentDto: CreateCommentDto) {
    // check if user and bookid exists in the database
    const { userId, bookId, ...commentData } = createCommentDto;

    // find user by ID
    const user = await this.usersService.getUserById(userId);
    const book = await this.booksService.getBookById(bookId);

    // check if the comment exists from the same user

    // if both user and book exist  create a new comment
    if (user && book) {
      const newComment = this.commentsRepository.create({
        ...commentData,
      });
      newComment.user = user;
      newComment.book = book;
      // save comment to the database
      return await this.commentsRepository.save(newComment);
    } else {
      console.log('user', user);
      console.log('book', book);
      return { message: 'user or book not found' };
    }
  }
}
