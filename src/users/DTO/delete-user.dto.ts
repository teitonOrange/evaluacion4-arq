import { IsString, IsUUID } from "class-validator";

export class DeleteUserDTO {

    @IsUUID()
    public id: string;

}