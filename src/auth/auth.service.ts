import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  TOP_SECRET_KEY = this.configService.get<string>('SECRET_SEED');

  

  // Verificar un token JWT
  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {secret: this.TOP_SECRET_KEY });
      return true;
    } catch (error) {
      return false; // Token inválido o expirado
    }
  }
}
