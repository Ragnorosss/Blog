import { IsEmail, IsString, MinLength } from "class-validator";

export class LogInDto { 
    @IsEmail()
    email:string;
    @IsString()
    userName: string
    @IsString()
    @MinLength(6)
    password: string;
    
}