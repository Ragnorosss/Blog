import { Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { Public } from '@shared/decorators';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create-post') 
  async create(@Body() dto, @Request() req) {
    return this.postService.create({
      title: dto.title,
      desc: dto.desc,
      user: {
        connect: {
          id: req.user.id,
          userName: req.user.userName
        }
      }
    });
  }
  @Public()
  @Get('all')
  async findAll(@Query('limit') limit: string) {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    return this.postService.findAll(limitNumber);
  }
  @Public()
  @Get(':id')
  async findOne(id: string) {
    return this.postService.findOne(id);
  }
  @Delete(':id')async delete(@Param('id') id:string, @Request() req) {
    const user = req.user; 
    return this.postService.delete(id, user.id);
  }
}

