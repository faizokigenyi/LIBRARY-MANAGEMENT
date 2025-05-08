import { Book } from 'src/books/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 256, nullable: true })
  description?: string;

  @Column({ length: 96, nullable: true, unique: true })
  slug?: string;

  @Column({ length: 1024, nullable: true })
  imageUrl?: string;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];
}
