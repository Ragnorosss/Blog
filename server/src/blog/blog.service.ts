import { PrismaService } from '@prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Injectable()
export class BlogService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) {}
    async create(blog: Prisma.BlogCreateInput) {
        return this.prismaService.blog.create({
          data:{
            title: blog.title,
            desc: blog.desc,
            userId: blog.user.connect.id
          },
        });
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

