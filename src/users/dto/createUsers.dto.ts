import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseDTO } from 'src/base/base.dto'

export class CreateUserDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
