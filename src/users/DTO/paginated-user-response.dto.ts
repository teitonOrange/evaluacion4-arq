import { GetUserDTO } from "./get-user.dto";

export class PaginatedUserResponse {
    statusCode: number;
    message: string;
    user: GetUserDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    };

