import { IsNotEmpty, IsString, Max } from "class-validator";

export class UpdateUserDTO {

    @IsString()
    @IsNotEmpty()
    @Max(15)
    public name: string;

    @IsString()
    @IsNotEmpty()
    @Max(100)
    public email: string;

    @IsString()
    @IsNotEmpty()
    @Max(100)
    public apellidos: string;

    @IsString()
    @IsNotEmpty()
    @Max(30)
    public password: string;

    
}