import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LogInDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { ITokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { agent } from 'supertest';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly userService: UserService, 
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async refreshTokens(refreshToken:string, agent: string): Promise<ITokens> {
    const token = this.prismaService.token.findUnique({
      where:{
        token:refreshToken
      }
    });
    if(!token) {
      throw new UnauthorizedException('');
    }

    await this.prismaService.token.delete({where:{token:refreshToken}})
    if(new Date((await token).exp) < new Date()) {
      throw new UnauthorizedException('Token expired');
    }

    const user = await this.userService.findOne((await token).userId)
    return this.generateTokens(user, agent)
  }

  async register(dto:RegisterDto) {
    const user: User = await this.userService.findOne(dto.email).catch(err => { 
      this.logger.error(err);
      return null;
    });
     if(user){
      throw new ConflictException('User already exists');
     } 
    return this.userService.save(dto).catch(err=> {
      this.logger.error(err);
      return null;
     });  
  }
  async login(dto: LogInDto, agent: string): Promise<ITokens> {
    const user: User = await this.userService.findOne(dto.email, true).catch(err => { 
      this.logger.error(err);
      return null;
    });
    if(!user || !compareSync(dto.password, user.password)) { 
      throw new UnauthorizedException('Wrong email or password');
    }
   return this.generateTokens(user, agent)
  }
  private async generateTokens(user: User, agent: string):Promise<ITokens> {
    const accesToken = "Bearer " + this.jwtService.sign({ 
      id: user.id,
      email: user.email,
      roles: user.roles,
     });
     const refreshToken = await this.getRefreshToken(user.id, agent);
     return {accesToken, refreshToken}
  }
  private async getRefreshToken(userId: string, agent: string):Promise<Token> { 
    const _token = await this.prismaService.token.findFirst ({
      where:{
        userId, 
        userAgent: agent,
      }
    })
    const token =_token?.token ?? "";
    return this.prismaService.token.upsert({
      where:{ token },
      update:{
        token: v4(),
        exp: add(new Date(), {months: 1}),
      },
      create :{
        token: v4(),
        exp: add(new Date(), {months: 1}),
        userId,
        userAgent: agent
      }
    })
  }
  deleteRefreshToken(token: string) {
    return this.prismaService.token.delete({
      where: { token }
    })
  }
}
