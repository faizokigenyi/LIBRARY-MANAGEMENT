import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/users/user.entity';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/book.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => BooksModule),
    TypeOrmModule.forFeature([Comment, User, Book]),
  ],
})
export class CommentsModule {}
