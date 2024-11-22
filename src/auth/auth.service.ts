import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Generar un token JWT
  generateToken(): string {
    const payload = { client: 'api-consumer' }; // Carga útil básica
    return this.jwtService.sign(payload, { expiresIn: '60d' }); // Duración de 60 días
  }

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
