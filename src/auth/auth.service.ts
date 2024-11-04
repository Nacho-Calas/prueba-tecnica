import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto/createUsers.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from './../database/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDTO } from './dto/login.dto';
import { Role } from './../database/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginUserDTO): Promise<{ access_token: string }> {
    const user = await this.usersModel.findOne({ email: email }).lean();

    if (!user) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    const { password: _, ...result } = user;

    const token = await this.jwtService.signAsync(result);

    return { access_token: token };
  }

  async registerUser(createUserDTO: CreateUserDTO): Promise<Users> {
    const { username, email, password, role } = createUserDTO;
    const user = await this.usersModel.findOne({ email: email });
    if (user) {
      throw new Error('El email ya esta registrado');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.usersModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || [Role.USER],
    });

    return newUser.toObject();
  }
}
