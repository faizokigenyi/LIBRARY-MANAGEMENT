import { IsInt, IsNotEmpty } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  bookId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Book, (book) => book.comments, { eager: true })
  @JoinColumn()
  book: Book;
}
