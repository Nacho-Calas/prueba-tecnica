import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { jest } from '@jest/globals';
import { LoginUserDTO } from '../dto/login.dto';
import { CreateUserDTO } from '../dto/createUsers.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from 'src/database/enums/role.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn(),
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('debería devolver un mensaje y un access_token si las credenciales son válidas', async () => {

      jest.spyOn(authService, 'validateUser').mockResolvedValue({ access_token: 'testToken' });
  
      const result = await controller.login({ email: 'test@test.com', password: 'password' });
      expect(result).toEqual({
        message: 'Login exitoso',
        access_token: 'testToken',
        status: HttpStatus.CREATED,
      });
    });
  
    it('debería devolver un mensaje de error si las credenciales son inválidas', async () => {
      jest.spyOn(authService, 'validateUser').mockRejectedValue(
        new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED),
      );
  
      await expect(controller.login({ email: 'test@test.com', password: 'wrongpassword' }))
        .rejects.toThrow('Credenciales inválidas');
    });
  });
  

describe('register', () => {
  it('debería devolver un mensaje y un usuario si el registro es exitoso', async () => {
    const mockUser = {
      username: 'test',
      email: 'test@test.com',
      password: 'hashedPassword',
    };

    jest.spyOn(authService, 'registerUser').mockResolvedValue(mockUser);

    const result = await controller.register({
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    });
    expect(result).toEqual({
      message: 'Usuario registrado con éxito',
      user: mockUser,
      status: HttpStatus.CREATED,
    });
  });

  it('debería devolver un mensaje de error si el email ya está registrado', async () => {
    jest.spyOn(authService, 'registerUser').mockRejectedValue(
      new HttpException('El email ya esta registrado', HttpStatus.FORBIDDEN),
    );

    await expect(
      controller.register({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      }),
    ).rejects.toThrow('El email ya esta registrado');
  });
});

});
