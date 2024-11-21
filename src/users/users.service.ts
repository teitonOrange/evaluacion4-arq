import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserDto } from './DTO/user.dto';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(CreateUserDTO: CreateUserDTO): Promise<UserDto>{
        
        const { name, email, apellidos, password, isDeleted } = CreateUserDTO;
        return this.prisma.user.create({
            data: { 
                name, 
                email, 
                apellidos, 
                password, 
                isDeleted 
            } 
        });
    }

    //todo
    async getAllUsers(page: number, limit: number): Promise<{users: User[]; total: number }>
    {
        const skip = (page - 1) * limit; // Calcular cuántos registros omitir
        const total = await this.prisma.user.count(); // Total de usuarios en la base de datos
    
        const users = await this.prisma.user.findMany({
          skip,
          take: limit,
          where: {
            isDeleted: false, // Solo usuarios que no están eliminados
          },
        });
    
        return {
          users,
          total, 
        };  
    }

    //todo
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
