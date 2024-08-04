import { Post, Role, User } from "@prisma/client";
import { Exclude } from 'class-transformer';
export class UserResponse implements User {
    id: string;
    email: string;
    userName: string;
    @Exclude()
    password: string;
    
    @Exclude()
    createdAt: Date;
    updatedAt: Date;
    roles: Role[]
    post: Post[]
    constructor(user: User) {
        Object.assign(this, user)
    }
}