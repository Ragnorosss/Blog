import { IJWTPayLoad } from "@auth/interfaces";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const  CurrentUser = createParamDecorator(
    (key: keyof IJWTPayLoad, ctx: ExecutionContext): IJWTPayLoad | Partial<IJWTPayLoad> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
}) 