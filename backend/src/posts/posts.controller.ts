import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Req() req, @Query('sort') sort: 'ASC' | 'DESC' = 'DESC') {
    const userId = req.user.id; // беремо з токена
    return this.postsService.findAll(userId, sort);
  }
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    const user = req.user;
    return this.postsService.create(createPostDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const user = req.user;
    return this.postsService.remove(id, user);
  }
}
