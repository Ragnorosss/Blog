import { PrismaService } from '@prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable  } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Injectable()
export class BlogService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) {}
    async create(blog: Prisma.BlogCreateInput) {
        const blogs = this.prismaService.blog.create({
          data:{
            title: blog.title,
            desc: blog.desc,
            user: {
              connect: {
                id: blog.user.connect.id
              }
            }
          },
          select:{
            title: true,
            desc: true,
            userId: true,
            userNamed: true
          }
        });
        return blogs;
    }
    async findAll() {
        return this.prismaService.blog.findMany();
    }
    async findOne(id: string) {
        return this.prismaService.blog.findFirst({ where: { id } });
    }
    async delete(id: string, userId: string) {
        const user: User = await this.userService.findOne(userId);
        const blog = await this.prismaService.blog.findFirst({ where: { id, userId: user.id } });
        if (!blog) {
            throw new BadRequestException('Blog not found');
        }
        return await this.prismaService.blog.delete({ where: { id } });
    }
}

