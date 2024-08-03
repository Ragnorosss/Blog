import { Token } from "@prisma/client";

export interface ITokens {
    accesToken:string;
    refreshToken: Token;
}

export interface IJWTPayLoad { 
    id:string;
    email:string;
    userName:string;
    roles: string[];
}