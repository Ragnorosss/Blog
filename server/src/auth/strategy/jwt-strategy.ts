import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJWTPayLoad } from '@auth/interfaces';
import { UserService } from '@user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)
  constructor(
    private readonly configService: ConfigService, 
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJWTPayLoad) {
    const user = await this.userService.findOne(payload.id).catch(err => {
      this.logger.error(err);
      return null
    })
    if(!user) { 
        throw new UnauthorizedException('User not found');
    }
    return payload;
  }
}