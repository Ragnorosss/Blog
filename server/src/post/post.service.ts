import { PrismaService } from '@prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable  } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) {}
    async create(blog: Prisma.PostCreateInput) {
        const blogs = this.prismaService.post.create({
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
    async findAll(limit?: number) {
      const queryOptions: any = {
        orderBy: {
          createdAt: 'desc',
        },
      };
  
      if (limit !== undefined) {
        queryOptions.take = limit;
      }
  
      return this.prismaService.post.findMany(queryOptions);
    }
    async findOne(id: string) {
        return this.prismaService.post.findFirst({ where: { id } });
    }
    async delete(id: string, userId: string) {
        const user: User = await this.userService.findOne(userId);
        const blog = await this.prismaService.post.findFirst({ where: { id, userId: user.id } });
        if (!blog) {
            throw new BadRequestException('Blog not found');
        }
        return await this.prismaService.post.delete({ where: { id } });
    }
}

