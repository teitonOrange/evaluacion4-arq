import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService 
{
    constructor(private prisma: PrismaService) {}

    async createUser(name: string, email: string,apellidos: string, password: string, isDeleted: boolean)
    {
        return this.prisma.user.create({ data: { name, email, apellidos, password, isDeleted } });
    }

    async getAllUsers()
    {
        return this.prisma.user.findMany();
    }

    async getUserById(id: string)
    {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: string, data: { name?: string; email?: string; apellidos?: string; password?: string; isDeleted?: boolean; })
    {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string)
    {
        return this.prisma.user.delete({ where: { id } });
    }


}
