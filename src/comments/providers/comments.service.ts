import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dtos/create-comment-dto';
import { UsersService } from 'src/users/providers/users.service';
import { BooksService } from 'src/books/providers/books.service';
import { PatchCommentDto } from '../dtos/patch-comments.dto';

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

  public async getAllComments() {
    const comments = this.commentsRepository.find();
    return comments;
  }

  public async patchComment(patchCommentDto: PatchCommentDto) {
    // Find the comment that will need to be patched

    const commentId = patchCommentDto.id;
    let originalComment = await this.commentsRepository.findOneBy({
      id: commentId,
    });

    if (originalComment) {
      originalComment.content = patchCommentDto.content;
      return await this.commentsRepository.save(originalComment);
    } else {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
  }

  public async deleteComment(id: number) {
    // check if comment exists in the database
    const CommentToDelete = await this.commentsRepository.findOneBy({ id: id });

    if (CommentToDelete) {
      return await this.commentsRepository.delete(CommentToDelete.id);
    } else {
      throw new NotFoundException("Comment doesn't exist");
    }
  }
}
