import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LogInDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { ITokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaServce: PrismaService
  ) {}

  async refreshTokens(refreshToken: string, agent: string): Promise<ITokens> {
    try {
      const { id } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findOne(id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user, agent);
    } catch (error) {
      this.logger.error(`Ошибка при валидации refresh токена: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.findOne(dto.email).catch(err => {
      this.logger.error(err);
      return null;
    });
    if (user) {
      throw new ConflictException('Пользователь уже существует');
    }
    return this.userService.save(dto);
  }

  async login(dto: LogInDto, agent: string): Promise<ITokens> {
    const user = await this.userService.findOne(dto.email, true).catch(err => {
      this.logger.error(err);
      return null;
    });
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: User, agent: string): Promise<ITokens> {
    const accessToken = "Bearer " + this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    const refreshToken = {
      token: this.jwtService.sign(
        { id: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '30d',
        }
      ),
      exp: add(new Date(), { months: 1 }),
      userId: user.id,
      userAgent: agent
    };

    return { accessToken, refreshToken };
  }

  deleteRefreshToken(token: string) {
    
  }
}
