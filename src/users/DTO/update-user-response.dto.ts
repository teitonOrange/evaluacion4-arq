import { UserDto } from './user.dto';

export class UpdateUserResponse {
  statusCode: number;
  message: string;
  data: UserDto;
}
