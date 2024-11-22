import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  

  // Verificar un token JWT
  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false; // Token inválido o expirado
    }
  }
}
