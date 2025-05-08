import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './providers/books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { Genre } from 'src/genres/genre.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';
import { Book } from './book.entity';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    forwardRef(() => CommentsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => GenresModule),
    TypeOrmModule.forFeature([User, Comment, Genre, Book]),
  ],
  exports: [BooksService],
})
export class BooksModule {}
