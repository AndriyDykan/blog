import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  // ==========================
  // CREATE
  // ==========================
  async create(createPostDto: CreatePostDto, author: User): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      author, 
    });
    return this.postsRepository.save(post);
  }

  // ==========================
  // READ ALL
  // ==========================
  async findAll(userId?: number, sort: 'ASC' | 'DESC' = 'DESC'): Promise<Post[]> {
    const query = this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', sort);

    if (userId) {
      query.where('author.id = :userId', { userId });
    }

    return query.getMany();
  }

  // ==========================
  // READ ONE
  // ==========================
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ 
      where: { id }, 
      relations: ['author'] 
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  // ==========================
  // DELETE
  // ==========================
  async remove(id: number, user: User): Promise<void> {
    const post = await this.findOne(id);

    if (post.author.id !== user.id) {
      throw new NotFoundException('You can delete only your own posts');
    }
    await this.postsRepository.delete(id);
  }
}
