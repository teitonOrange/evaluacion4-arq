import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserDto } from './DTO/user.dto';
import { PaginatedUserResponse } from './DTO/paginated-user-response.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(CreateUserDTO: CreateUserDTO): Promise<UserDto>;
    getAllUsers(page: number, limit: number): Promise<PaginatedUserResponse>;
    getUserById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        apellidos: string;
        password: string;
        isDeleted: boolean;
    }>;
    updateUser(id: string, data: {
        name?: string;
        email?: string;
        apellidos?: string;
        password?: string;
        isDeleted?: boolean;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        apellidos: string;
        password: string;
        isDeleted: boolean;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        apellidos: string;
        password: string;
        isDeleted: boolean;
    }>;
}
