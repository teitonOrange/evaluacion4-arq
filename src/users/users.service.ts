import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { CreateUserResponse } from './DTO/create-user-response.dto';
import { UserDto } from './DTO/user.dto';
import { User } from '@prisma/client';
import { PaginatedUserResponse } from './DTO/paginated-user-response.dto';
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
    async getAllUsers(page: number, limit: number): Promise<PaginatedUserResponse>{
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
            throw new HttpException(
              { statusCode: HttpStatus.BAD_REQUEST, message: 'Page y limit deben ser números positivos.' },
              HttpStatus.BAD_REQUEST,
            );
          }

        const skip = (page - 1) * limit; // Calcular cuántos registros omitir
        const total = await this.prisma.user.count({
            where: {
                isDeleted: false, // Solo usuarios que no están softdeleted
            },
        }); // Total de usuarios en la base de datos
        const users = await this.prisma.user.findMany({
          skip,
          take: limitNumber,
          where: {
            isDeleted: false, // Solo usuarios que no están softdeleted
          },
        });
    
        return {
            
            statusCode: HttpStatus.OK,
            message: 'Usuarios obtenidos con éxito.',
            user: users,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),

            
        };  
    }

    //TO DO: terminar todo xd
    async getUserById(id: string){
        try{
            const user = await this.prisma.user.findUnique({
                where: { id },
         });
            
            if(!user) {
                throw new HttpException(
                    { statusCode: HttpStatus.NOT_FOUND, message: 'Usuario no encontrado' },
                    HttpStatus.NOT_FOUND,
                )
            }
            return user;
        } catch (error) {
            throw new HttpException(
                { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
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
