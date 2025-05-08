import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profiles/profile.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/book.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    forwardRef(() => ProfilesModule),
    forwardRef(() => BooksModule),
    TypeOrmModule.forFeature([User, Profile, Book]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
