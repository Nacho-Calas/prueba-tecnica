import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

const fakeUsers = [
  { id: 1, username: 'anson', password: 'password' },
  { id: 2, username: 'jack', password: 'password123' },
];

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    // private usersService: UsersService
  ) {}

  async validateUser({ username, password }: AuthPayloadDTO): Promise<any> {
    const user = fakeUsers.find((user) => user.username === username);

    if (!user || user.password !== password) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { password: _, ...result } = user;

    const token = await this.jwtService.signAsync(result);

    return { access_token: token };
  }
}
