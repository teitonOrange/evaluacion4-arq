import { UserDto } from "./user.dto";

export class CreateUserResponse {
    statusCode: number;
    message: string;
    data: UserDto;
}