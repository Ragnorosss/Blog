import { User } from "@prisma/client"
import { IsDataURI, IsString, MaxLength } from "class-validator"

export class CreateBlogDto {
    @IsString()
    @MaxLength(90)
    title: string
    @IsString()
    @MaxLength(500)
    desc: string
    @IsDataURI()
    createdAt: string
    @IsDataURI()
    updatedAt: string
    userId: Pick<User, 'id'>
}