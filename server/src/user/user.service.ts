import { IJWTPayLoad } from '@auth/interfaces';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    save(user: Partial<User>) {
        const hashedPassword = this.hashPassword(user.password)
        return this.prismaService.user.create(
            { 
                data:  {
                    email: user.email,
                    password: hashedPassword,
                    roles: ['USER']
                }
            }
        );
    }
    findOne(idOrEmail: string) {
        return this.prismaService.user.findFirst({ 
            where: { 
                OR:[{id:idOrEmail}, {email:idOrEmail}] 
            } 
        });
    }
    async delete(id: string, user: IJWTPayLoad) {
        if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        if(!user.id) { 
            throw new BadRequestException('User not found');
        }
        return await this.prismaService.user.delete({ where: { id }, select: { id: true } });
    }
    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

}
