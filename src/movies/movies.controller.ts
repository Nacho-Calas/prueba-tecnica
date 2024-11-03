import { Body, Controller, Get, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Movies } from 'src/database/schemas/movies.schema';
import { CreateMoviesDTO } from './dto/createMovies.dto';
import { MoviesDTO } from './dto/movies.dto';
import { MoviesService } from './movies.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/database/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMoviesDTO } from './dto/updateMovies.dto';


@Controller('/movies')
export class MoviesController {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        private readonly moviesService: MoviesService
    ) {}

  @Get('/all')
    @UseGuards(AuthGuard())
    @Roles(Role.USER)
    @ApiOperation({ summary: 'Obtener todas las películas' })
    @ApiResponse({
        status: 200,
        description: 'Lista de películas',
        type: [MoviesDTO],
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getMovies(): Promise<Object> {
        try{
            const movies = this.moviesService.getMovies();
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
    @UseGuards(AuthGuard())
    // @Roles(Role.ADMIN)
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Obtener una película por ID' })
    @ApiResponse({
        status: 200,
        description: 'Película encontrada',
        type: MoviesDTO,
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
    @UseGuards(AuthGuard())
    // @ApiRoles('admin')
    @ApiOperation({ summary: 'Crear una película' })
    @ApiResponse({
        status: 200,
        description: 'Película creada',
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
    @UseGuards(AuthGuard())
    // @ApiRoles('admin')
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Actualizar una película' })
    @ApiResponse({
        status: 200,
        description: 'Película actualizada',
        type: MoviesDTO,
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
    @UseGuards(AuthGuard())
    // @ApiRoles('admin')
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
