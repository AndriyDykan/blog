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


  async create(createPostDto: CreatePostDto, author: User): Promise<any> {
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });
    const savedPost = await this.postsRepository.save(post);

    return {
      id: savedPost.id,
      title: savedPost.title,
      text: savedPost.text,
      author: savedPost.author.id,
      createdAt: savedPost.createdAt,
    };
  }

  async findAll(userId?: number, sort: 'ASC' | 'DESC' = 'DESC'): Promise<any[]> {
    const query = this.postsRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', sort);

    if (userId) {
      query.where('author.id = :userId', { userId });
    }

    const posts = await query.getMany();


    return posts.map(post => ({
      id: post.id,
      title: post.title,
      text: post.text,
      author: post.author.id,
      createdAt: post.createdAt,
    }));
  }


  async findOne(id: number): Promise<any> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) throw new NotFoundException('Post not found');

    return {
      id: post.id,
      title: post.title,
      text: post.text,
      author: post.author.id,
      createdAt: post.createdAt,
    };
  }


  async remove(id: number, user: User): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) throw new NotFoundException('Post not found');

    if (post.author.id !== user.id) {
      throw new NotFoundException('You can delete only your own posts');
    }

    await this.postsRepository.delete(id);
  }
}
