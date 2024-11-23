import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { CreateUserResponse } from './DTO/create-user-response.dto';
import { PaginatedUserResponse } from './DTO/paginated-user-response.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(dto: CreateUserDTO): Promise<CreateUserResponse>;
    getAllUsers(page?: number, limit?: number): Promise<PaginatedUserResponse>;
    getUserById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        apellidos: string;
        password: string;
        isDeleted: boolean;
    }>;
}
