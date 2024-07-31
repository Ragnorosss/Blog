import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
