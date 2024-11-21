import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class UpdateUserDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    public name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    public apellidos: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    public password: string;

    
}