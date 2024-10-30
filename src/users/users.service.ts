import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Users } from 'src/database/schemas/users.schema'
import { CreateUserDTO } from './dto/createUsers.dto';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>){ }

    registerUser(createUserDTO: CreateUserDTO, req: Request){
        const newUser = new this.usersModel(createUserDTO)
        return newUser.save()
    }
}
