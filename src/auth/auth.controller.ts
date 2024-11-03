import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUsers.dto';
import { LoginUserDTO } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Iniciar sesión para un usuario' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido autenticado con éxito',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(
    @Body() authPayload: LoginUserDTO,
  ): Promise<{ message: string; access_token: string }> {
    try {
      const result = await this.authService.validateUser(authPayload);
      return { 
        message: 'Login exitoso',
        access_token: result.access_token
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error en autenticación',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Registrar un usuario' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido registrado con éxito',
  })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  async register(@Body() createUserDTO: CreateUserDTO): Promise<Object> {
      try {
      const result = await this.authService.registerUser(createUserDTO);
      return {
         message: 'Usuario registrado con éxito',
         user: result,
         status: HttpStatus.CREATED,
      };  
    } catch (error) {
      throw new HttpException(  
        error.message || 'Error en el registro',
        error.status || HttpStatus.FORBIDDEN,
      );
    }
  }
}
