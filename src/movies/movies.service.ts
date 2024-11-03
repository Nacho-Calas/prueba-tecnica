import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Movies } from 'src/database/schemas/movies.schema';
import { CreateMoviesDTO } from './dto/createMovies.dto';
import { UpdateMoviesDTO } from './dto/updateMovies.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private movieModel: Model<Movies>) {}

  async getAndUpdateMovies() {
    const response = await axios.get('https://swapi.dev/api/films/');
    const movies = response.data.results;

    for (let movie of movies) {
      const movieExists = await this.movieModel.exists({
        title: movie.title,
        episode_id: movie.episode_id,
      });
      if (movieExists) {
        console.log(`La película ${movie.title} ya existe en la base de datos`);
        continue;
      }
      const newMovie = new this.movieModel(movie);
      await newMovie.save();
    }
  }

  async getMovies(): Promise<Movies[]> {
    try {
      const movies = await this.movieModel.find({ deletedAt: null }).exec();
      return movies;
    } catch (error) {
      throw new HttpException(
        `Error al obtener las películas: ${error.message}`,
        500,
      );
    }
  }

  async getMovieById(id: string): Promise<Movies> {
    try {
      const movieExists = await this.movieModel.exists({
        _id: id,
        deletedAt: null,
      });
      if (!movieExists) {
        throw new Error('La película no existe en la base de datos');
      }
      return this.movieModel.findById(id).exec();
    } catch (error) {
      throw new HttpException(
        `Error al obtener la película: ${error.message}`,
        500,
      );
    }
  }

  async createMovie(movie: CreateMoviesDTO): Promise<Movies> {
    try {
      const movieExists = await this.movieModel.exists({
        title: movie.title,
        episode_id: movie.episode_id,
      });
      if (movieExists) {
        throw new Error('La película ya existe en la base de datos');
      }
      const newMovie = new this.movieModel(movie);
      const result = await newMovie.save();

      return result;
    } catch (error) {
      throw new HttpException(
        `Error al crear la película: ${error.message}`,
        500,
      );
    }
  }

  async updateMovie(id: string, movie: UpdateMoviesDTO): Promise<Movies> {
    try {
      const movieExists = await this.movieModel.exists({
        _id: id,
        deletedAt: null,
      });
      if (!movieExists) {
        throw new Error('La película no existe en la base de datos');
      }
      
      return this.movieModel.findByIdAndUpdate(id, {...movie, updatedAt: Date.now()}, { new: true }).exec();
    } catch (error) {
      throw new HttpException(
        `Error al actualizar la película: ${error.message}`,
        500,
      );
    }
  }

  // Borrado Logico - No se elimina completamente el registro solo se actualiza el campo isDeleted
  async deleteMovie(id: string): Promise<Movies> {
    try {
      const response = this.movieModel
        .findByIdAndUpdate(id, { deletedAt: Date.now(), updatedAt: Date.now() }, { new: true })
        .exec();
      return response;
    } catch (error) {
      throw new HttpException(
        `Error al eliminar la película: ${error.message}`,
        500,
      );
    }
  }
}
