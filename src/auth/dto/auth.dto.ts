import { ApiProperty } from '@nestjs/swagger';

export class AuthPayloadDTO {
  @ApiProperty({
    description: 'El username del usuario',
    example: 'han_solo',
  })
  username: string;

  @ApiProperty({
    description: 'La contrasena del usuario',
    example: 'passwordPassword123!',
    minLength: 6,
  })
  password: string;
}
