import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';

import { UserDto } from './DTO/user.dto';

import { PaginatedUserResponse } from './DTO/paginated-user-response.dto';
import { isUUID } from 'class-validator';

import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(CreateUserDTO: CreateUserDTO): Promise<UserDto>{
        
        const { name, email, apellidos, password, isDeleted } = CreateUserDTO;
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: { 
                name, 
                email, 
                apellidos, 
                password: hashedPassword, 
                isDeleted 
            } 
        });
    }

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

        if (skip >= total) {
            throw new HttpException(
              { statusCode: HttpStatus.BAD_REQUEST, message: 'Page fuera de rango.' },
              HttpStatus.BAD_REQUEST,
            );
          }
        const users = await this.prisma.user.findMany({
          skip,
          take: limitNumber,
          where: {
            isDeleted: false, // Solo usuarios que no están softdeleted
          },
          orderBy: {apellidos: 'asc'},
        });
    
        return {
            
            statusCode: HttpStatus.OK,
            message: 'Usuarios obtenidos con éxito. Ordenados alfabeticamente',
            user: users,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),

            
        };  
    }

    async getUserById(id: string) {
        try {
          // Validar el formato del ID 
          if (!id || typeof id !== 'string' || id.trim() === '' || !isUUID(id)) {
            throw new HttpException(
              { statusCode: HttpStatus.BAD_REQUEST, message: 'El formato del ID no es válido' },
              HttpStatus.BAD_REQUEST,
            );
          }
      
          // Buscar usuario por ID
          const user = await this.prisma.user.findUnique({
            where: { id },
          });
      
          // Validar si el usuario existe
          if (!user) {
            throw new HttpException(
              { statusCode: HttpStatus.NOT_FOUND, message: 'Usuario no encontrado' },
              HttpStatus.NOT_FOUND,
            );
          }
      
          // Validar si el usuario está marcado como eliminado
          if (user.isDeleted) {
            throw new HttpException(
              { statusCode: HttpStatus.GONE, message: 'El usuario está eliminado' },
              HttpStatus.GONE,
            );
          }
      
          // Retornar el usuario si pasa todas las validaciones
          return {
            statusCode: HttpStatus.OK,
            message: 'Usuario encontrado con éxito',
            data: user,
          };
        } catch (error) {
          // Manejo genérico de errores internos del servidor
          if (!(error instanceof HttpException)) {
            throw new HttpException(
              { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
          // Propagar cualquier error que ya sea una HttpException
          throw error;
        }
      }
      

    
      async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDto> {
        try {
          // Buscar usuario existente
          const existingUser = await this.prisma.user.findUnique({
            where: { id },
          });
    
          if (!existingUser) {
            throw new HttpException(
              { statusCode: HttpStatus.NOT_FOUND, message: 'Usuario no encontrado' },
              HttpStatus.NOT_FOUND,
            );
          }

            // Verificar si el usuario está eliminado
          if (existingUser.isDeleted) {
            throw new HttpException(
              { statusCode: HttpStatus.FORBIDDEN, message: 'No se puede actualizar un usuario eliminado' },
                HttpStatus.FORBIDDEN,
            );
          }
    
          // Hashear la contraseña si es proporcionada
          if (updateUserDTO.password) {
            updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 10);
          }
    
        
    
          // Actualizar el usuario
          const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDTO,
          });
    
          // Mapear el resultado al DTO de respuesta
          return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            apellidos: updatedUser.apellidos,
            isDeleted: updatedUser.isDeleted,
          };
        } catch (error) {
          if (error instanceof HttpException) {
            throw error; // Re-lanzar excepciones de tipo HttpException
          }
    
          throw new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Error interno del servidor',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }


    async softDeleteUser(id: string): Promise<boolean> {
      try {
        // Verificar si el usuario existe
        const user = await this.prisma.user.findUnique({
          where: { id },
        });
  
        if (!user || user.isDeleted) {
          return false; // Usuario no encontrado o ya eliminado
        }
  
        // Actualizar la propiedad isDeleted a true (soft delete)
        await this.prisma.user.update({
          where: { id },
          data: { isDeleted: true },
        });
  
        return true; // Soft delete exitoso
      } catch (error) {
        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

}
