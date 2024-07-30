import { IsEmail, IsString, MinLength, Validate } from "class-validator";

export class LogInDto { 
    @IsEmail()
    email:string;
    
    @IsString()
    @MinLength(6)
    password: string;
    
}