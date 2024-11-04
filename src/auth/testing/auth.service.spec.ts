import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../../database/schemas/users.schema';
import { LoginUserDTO } from '../dto/login.dto';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersModel: any;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Users.name),
          useValue: {
            findOne: jest.fn().mockReturnValue({
              lean: jest.fn(),
            }),
            create: jest.fn(),
            toObject: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersModel = module.get(getModelToken(Users.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('debería retornar un token si las credenciales son válidas', async () => {
      const mockUser = { email: 'test@test.com', password: 'hashedPassword' };
      usersModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      });
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('testToken');

      const result = await authService.validateUser({
        email: 'test@test.com',
        password: 'password',
      });
      expect(result).toEqual({ access_token: 'testToken' });
    });

    it('debería lanzar una HttpException si las credenciales son inválidas', async () => {
      usersModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(
        authService.validateUser({
          email: 'test@test.com',
          password: 'password',
        }),
      ).rejects.toThrow(
        new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED),
      );
    });
  });
  describe('registerUser', () => {
    it('debería crear un nuevo usuario si el email no está registrado', async () => {
      usersModel.findOne.mockResolvedValue(null);
      usersModel.create.mockResolvedValue({
        toObject: () => ({ username: 'test', email: 'test@test.com' }),
      });

      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');

      const newUser = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      };

      const result = await authService.registerUser(newUser);
      expect(result).toMatchObject({
        username: 'test',
        email: 'test@test.com',
      });
    });

    it('debería lanzar un error si el email ya está registrado', async () => {
      usersModel.findOne.mockResolvedValue({ email: 'test@test.com' });

      await expect(
        authService.registerUser({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
        }),
      ).rejects.toThrowError('El email ya esta registrado');
    });
  });
});
