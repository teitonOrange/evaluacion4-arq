import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { CreateUserResponse } from './DTO/create-user-response.dto';
import { PaginatedUserResponse } from './DTO/paginated-user-response.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';
import { UpdateUserResponse } from './DTO/update-user-response.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    
    @Post()
    @HttpCode(HttpStatus.CREATED) // Código 201 por defecto para POST exitoso
    async createUser(@Body() dto: CreateUserDTO): Promise<CreateUserResponse>{
        try {
        // Llamar al servicio para crear un usuario
        const newUser = await this.usersService.createUser(dto);
        return { statusCode: HttpStatus.CREATED, message: 'Usuario creado con éxito', data: newUser };
      } catch (error) {
        // Manejo de errores (400 y 500)
        if (error.code === 'P2002') { // Prisma: Error por duplicado de clave única
          throw new HttpException(
            { statusCode: HttpStatus.BAD_REQUEST, message: 'Correo ya está registrado' },
            HttpStatus.BAD_REQUEST,
          );
        }
  
        // Otro error inesperado (500)
        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Get()
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<PaginatedUserResponse>{

    return this.usersService.getAllUsers(page, limit);

    }
    

    @Get(':id')
    async getUserById(@Param('id') id: string){
    
      try {
        return await this.usersService.getUserById(id);
      
      } catch (error) {
        if(error instanceof HttpException) {
          throw error;
        }

        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Código 204 para DELETE exitoso
    async deleteUser(@Param('id') id: string) {
      try {
        const userDeleted = await this.usersService.softDeleteUser(id);
        if (!userDeleted) {
          throw new HttpException(
            { statusCode: HttpStatus.NOT_FOUND, message: 'Usuario no encontrado' },
            HttpStatus.NOT_FOUND,
          );
        }
        return {statusCode: HttpStatus.NO_CONTENT, message: 'Usuario ELIMINADO con éxito'}

      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        }

        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK) // Respuesta exitosa: 200 OK
    async updateUser(
      @Param('id') id: string,
      @Body() dto: UpdateUserDTO,
    ): Promise<UpdateUserResponse> {
      try {
        // Llamar al servicio para actualizar el usuario
        const updatedUser = await this.usersService.updateUser(id, dto);
        return {
          statusCode: HttpStatus.OK,
          message: 'Usuario actualizado con éxito',
          data: updatedUser,
        };
      } catch (error) {
        // Manejo de errores
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
  


}

