import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUsers.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post('/')
    @ApiOperation({ summary: 'crear Usuario'})
    @ApiBody({ type: CreateUserDTO })
    @ApiResponse({
        status: 201,
        description: 'El ususario ha sido creado con exito en la base de datos'
    })
    @ApiResponse({ status: 403, description: 'Prohibido'})
    async create (@Body() createUserDTO: CreateUserDTO, req: Request) {
        try{
            return await this.usersService.registerUser(createUserDTO, req)
        }catch(error){
            throw new Error('Error intentando registrar usuario: ' + error.message)
        }
    }
}
