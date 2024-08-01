import { User } from "@prisma/client"

export class DeleteaBlogDto { 
    id: string
    userId: User
}