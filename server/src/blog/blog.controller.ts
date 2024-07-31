import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/CreateBlog.dto';
import { Public } from '@shared/decorators';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create-blog') 
  async create(@Body() dto: CreateBlogDto, @Request() req) {
    return this.blogService.create({
      ...dto,
      user: { connect: { id: req.user.id } },
    });
  }
  @Public()
  @Get('all')
  async findAll() {
    return this.blogService.findAll();
  }
  @Public()
  @Get(':id')
  async findOne(id) {
    return this.blogService.findOne(id);
  }
  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.blogService.delete(+id);
  }
}

