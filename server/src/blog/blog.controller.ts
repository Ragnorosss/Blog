import { Body, Controller, Delete, Get, Param, Post, Query, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { Public } from '@shared/decorators';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create-blog') 
  async create(@Body() dto, @Request() req) {
    return this.blogService.create({
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
    return this.blogService.findAll(limitNumber);
  }
  @Public()
  @Get(':id')
  async findOne(id: string) {
    return this.blogService.findOne(id);
  }
  @Delete(':id')async delete(@Param('id') id:string, @Request() req) {
    const user = req.user; 
    return this.blogService.delete(id, user.id);
  }
}

