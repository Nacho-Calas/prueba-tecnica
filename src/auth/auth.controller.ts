import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión para un usuario' })
  @ApiBody({ type: AuthPayloadDTO })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido autenticado con éxito',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() authPayload: AuthPayloadDTO) {
    try {
      const result = await this.authService.validateUser(authPayload);
      return { message: 'Login exitoso', ...result };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error en autenticación',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
