import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDTO } from 'src/base/base.dto';

export class CreateUserDTO extends BaseDTO { 
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El nombre de usuario',
    example: 'han_solo1',
  })
  username: string;

  @ApiProperty({
    description: 'El email del usuario',
    example: 'han_solo12@starwars.com',
  })
  @IsEmail({}, { message: 'El email debe ser un email valido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'passwordPassword123!',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
