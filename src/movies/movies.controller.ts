import { Body, Controller, Get, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Model } from 'mongoose';
import { CreateMoviesDTO } from './dto/createMovies.dto';
import { MoviesDTO } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMoviesDTO } from './dto/updateMovies.dto';
import { Movies } from '../database/schemas/movies.schema';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../database/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('/movies')
export class MoviesController {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        private readonly moviesService: MoviesService
    ) {}

  @Get('/all')
    @ApiOperation({ summary: 'Obtener todas las películas' })
    @ApiResponse({
        description: 'Lista de películas',
        type: [MoviesDTO],
        status: HttpStatus.OK,
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getMovies(): Promise<Object> {
        try{
            const movies = await this.moviesService.getMovies();
            return {
                message: 'Lista de películas',
                movies: movies,
                status: HttpStatus.OK
            }
        } catch (error) {
            console.log(error);
        }
    }

  @Get('/:id')
    @Roles(Role.USER)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Obtener una película por ID' })
    @ApiResponse({
        description: 'Película encontrada',
        type: MoviesDTO,
        status: HttpStatus.OK,
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getMovieById(@Req() req: Request): Promise<Object> {
        const id = req.params.id;
        const response = await this.moviesService.getMovieById(id);
        return {
            message: 'Película encontrada',
            movie: response,
            status: HttpStatus.OK
        }
    }
 
    @Post('/create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOperation({ summary: 'Crear una película' })
    @ApiResponse({
        description: 'Película creada',
        status: HttpStatus.OK,
        type: MoviesDTO,
    })
    @ApiBody({ type: CreateMoviesDTO })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async createMovie(@Body() movie: CreateMoviesDTO): Promise<Object> {
        await this.moviesService.createMovie(movie);
        return {
            message: 'Película creada',
            movieCreated: movie,
            status: HttpStatus.OK
        };
    }

    @Put('/update/:id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Actualizar una película' })
    @ApiResponse({
        description: 'Película actualizada',
        type: MoviesDTO,
        status: HttpStatus.OK,
    })
    @ApiBody({ type: UpdateMoviesDTO })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async updateMovie(@Req() req: Request, @Body() movie: UpdateMoviesDTO): Promise<Object> {
        const id = req.params.id;
        const response = await this.moviesService.updateMovie(id, movie);
        return {
            message: 'Película actualizada',
            movieUpdated: response,
            status: HttpStatus.OK
        }
    }

    @Put('/delete/:id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @ApiOperation({ summary: 'Eliminar una película' })
    @ApiResponse({
        status: 200,
        description: 'Película eliminada',
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async deleteMovie(@Req() req: Request): Promise<Object> {
        try{
            //Borrado logico
            const id = req.params.id;
            await this.moviesService.deleteMovie(id);
            return {
                message: 'Película eliminada',
                status: HttpStatus.OK
            };

        }catch(error){
            throw new Error('Error al eliminar la película' + error.message);
        }
    }
}
