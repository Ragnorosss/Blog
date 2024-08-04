import { Module, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
