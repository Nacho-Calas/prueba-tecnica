import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Movies } from 'src/database/schemas/movies.schema';
import { CreateMoviesDTO } from './dto/createMovies.dto';
import { MoviesDTO } from './dto/movies.dto';
import { MoviesService } from './movies.service';


@Controller('/movies')
export class MoviesController {
    constructor(
        @InjectModel(Movies.name) private movieModel: Model<Movies>,
        private readonly moviesService: MoviesService
    ) {}

  @Get('/all')
    @ApiOperation({ summary: 'Obtener todas las películas' })
    @ApiResponse({
        status: 200,
        description: 'Lista de películas',
        type: [MoviesDTO],
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getMovies(): Promise<any> { // <- Resolver Promise
        try{
            const movies = this.moviesService.getMovies();
            return movies;
        } catch (error) {
            console.log(error);
        }
    }

  @Get('/:id')
    // @AuthGuard()
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Obtener una película por ID' })
    @ApiResponse({
        status: 200,
        description: 'Película encontrada',
        type: MoviesDTO,
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getMovieById(@Req() req: Request): Promise<Movies> {
        const id = req.params.id;
        return this.moviesService.getMovieById(id);
    }

    @Post('/create')
    // @AuthGuard()
    // @ApiRoles('admin')
    @ApiOperation({ summary: 'Crear una película' })
    @ApiResponse({
        status: 200,
        description: 'Película creada',
        type: MoviesDTO,
    })
    @ApiBody({ type: CreateMoviesDTO })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async createMovie(@Body() movie: MoviesDTO): Promise<Movies> {
        return this.moviesService.createMovie(movie);
    }

    @Put('/update/:id')
    // @AuthGuard()
    // @ApiRoles('admin')
    @ApiParam({ name: 'id', required: true, description: 'ID de la película' })
    @ApiOperation({ summary: 'Actualizar una película' })
    @ApiResponse({
        status: 200,
        description: 'Película actualizada',
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async updateMovie(@Req() req: Request, @Body() movie: MoviesDTO): Promise<Movies> {
        const id = req.params.id;
        return this.moviesService.updateMovie(id, movie);
    }

    @Put('/delete/:id')
    // @AuthGuard()
    // @ApiRoles('admin')
    @ApiOperation({ summary: 'Eliminar una película' })
    @ApiResponse({
        status: 200,
        description: 'Película eliminada',
    })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async deleteMovie(@Req() req: Request): Promise<Movies> {
        try{
            //Borrado logico
            const id = req.params.id;
            return this.moviesService.deleteMovie(id);
        }catch(error){
            throw new Error('Error al eliminar la película' + error.message);
        }
    }


}
