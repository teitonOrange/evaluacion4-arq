import { IsString, IsNotEmpty, Max, IsUUID, max, IsBoolean } from "class-validator";

export class CreateUserDTO {

    

    @IsString()
    @IsNotEmpty()
    @Max(15)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Max(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Max(100)
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    @Max(30)
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isDeleted: boolean;


    
}
