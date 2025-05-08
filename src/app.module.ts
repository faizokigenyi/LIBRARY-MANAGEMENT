import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GenresModule } from './genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    ProfilesModule,
    GenresModule,
    CommentsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: '1234',
        host: 'localhost',
        autoLoadEntities: true,
        database: 'lib-management',
      }),
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
