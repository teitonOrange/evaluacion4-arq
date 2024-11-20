export class UserDto {
    public id: string; // UUID
    public name: string; // max 15
    public email: string; // max 100
    public apellidos: string; // max 100
    public password: string; // max 30 hasheada
    public isDeleted: boolean; 
}