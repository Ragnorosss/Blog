import { Token } from "@prisma/client";

export interface ITokens {
    accessToken: string;
    refreshToken: {
      token: string;
      exp: Date;
      userId: string;
      userAgent: string;
    };
  }

export interface IJWTPayLoad { 
    id:string;
    email:string;
    userName:string;
    roles: string[];
    blog: string[];
}