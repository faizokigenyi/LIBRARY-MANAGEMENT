import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from 'src/profiles/profile.entity';
import { Comment } from 'src/comments/comment.entity';
import { Book } from 'src/books/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96 })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 96, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 96 })
  password: string;

  @Column({ type: 'varchar', default: 'reader' })
  role: 'reader' | 'author' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  profile?: Profile;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Book, (books) => books.author, {})
  books: Book;
}
