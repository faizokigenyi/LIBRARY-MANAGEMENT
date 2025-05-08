import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  bio?: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  country?: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  city?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true, length: 64 })
  twitterHandle?: string;

  @Column({ nullable: true, length: 64 })
  linkedinHandle?: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  user: User;
}
