import { IsString, IsNotEmpty, Max, IsUUID, max, IsBoolean, MaxLength } from "class-validator";

export class CreateUserDTO {

    

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isDeleted: boolean;

   

    
}
