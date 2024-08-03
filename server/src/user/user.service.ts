import { IJWTPayLoad } from '@auth/interfaces';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { hashSync, genSaltSync } from 'bcrypt';
import { convertToSecondsUtil } from '@shared/utils';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}
    save(user: Partial<User>) {
        const hashedPassword = this.hashPassword(user.password)
        return this.prismaService.user.create(
            { 
                data:  {
                    email: user.email,
                    roles: ['USER'],
                    password: hashedPassword,
                    userName: user.userName
                },
               
            }
        );
    }
 
   async findOne(idOrEmail: string, isReset: boolean = false) {
    if(isReset) {
        await this.cacheManager.del(idOrEmail);
    }
    const user = await this.cacheManager.get<User>(idOrEmail);
    if(!user) {
        const user = await this.prismaService.user.findFirst({ 
            where: { 
                OR:[{id:idOrEmail}, {email:idOrEmail}] 
            } 
        });
        if(!user) {
            return null;
        }
        await this.cacheManager.set(idOrEmail, user, convertToSecondsUtil(this.configService.get("JWT_EXP")));
        return user
    }    
    return user; 
    }
    async delete(id: string, user: IJWTPayLoad) {
        if (user.id !== id && !user.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        if(!user.id) { 
            throw new BadRequestException('User not found');
        }
        await Promise.all([
            await this.cacheManager.del(id),
            await this.cacheManager.del(user.email)
        ])
        return await this.prismaService.user.delete({ where: { id }, select: { id: true } });
    }
    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

}
