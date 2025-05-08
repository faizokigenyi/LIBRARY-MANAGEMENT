import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Genre } from 'src/genres/genre.entity';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @Column({ type: 'date', nullable: true })
  publishedAt?: string;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ length: 512, nullable: true })
  summary?: string;

  @Column({ type: 'int', nullable: true })
  pageCount?: number;

  @Column({ length: 64, nullable: true })
  language?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relational: Book → User (Author)
  @ManyToOne(() => User, (user) => user.books, {
    eager: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  // Relational: Book → Genres (Many-to-Many)
  @ManyToMany(() => Genre, (genre) => genre.books, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'book_genre',
  }) // table name for the junction table of this relation})
  genres: Genre[];

  // Relational: Book → Comments (One-to-Many)
  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];
}
