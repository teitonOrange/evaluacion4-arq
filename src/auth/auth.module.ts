import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Define tu clave secreta aquí
      signOptions: { expiresIn: '60d' }, // Duración predeterminada
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
