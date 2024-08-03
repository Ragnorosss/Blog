import { IJWTPayLoad } from '@auth/interfaces';
import { CurrentUser, Public, Roles } from '@shared/decorators';
import {
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserResponse } from './response' 
import { UserService } from './user.service';
import { RolesGuard } from '@auth/guards/role.guard';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail);
        return new UserResponse(user);
    }

    @Delete(':id')
     deleteUser(
        @Param('id', ParseUUIDPipe) id: string, 
        @CurrentUser() user: IJWTPayLoad
    ) {
        return this.userService.delete(id, user);
    }
    // @UseGuards(RolesGuard)
    // @Roles(Role.ADMIN)
    @Get()
    me(@CurrentUser() user: IJWTPayLoad) {
        return user;
    }
    
}