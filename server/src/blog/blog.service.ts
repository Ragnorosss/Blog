import { PrismaService } from '@prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    constructor(
        private readonly prismaService: PrismaService,
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
    async findOne(id: number) {
        return this.prismaService.blog.findFirst({ where: { id } });
    }
    async delete(id: number) {
        return await this.prismaService.blog.delete({ where: { id }});
    }
}

