import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) username: string;
  @Column({ unique: true }) email: string;
  @Column() passwordHash: string;
  @CreateDateColumn() createdAt: Date;
  @OneToMany(() => Post, post => post.author) posts: Post[];
}
