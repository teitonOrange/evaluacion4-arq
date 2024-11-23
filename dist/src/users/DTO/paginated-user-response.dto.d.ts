import { GetUserDTO } from "./get-user.dto";
export declare class PaginatedUserResponse {
    statusCode: number;
    message: string;
    user: GetUserDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
