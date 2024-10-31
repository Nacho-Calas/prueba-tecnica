import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Movies } from 'src/database/schemas/movies.schema';
import { CreateMoviesDTO } from './dto/createMovies.dto';

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
      const movies = await this.movieModel.find({ isDeleted: false }).exec();
      return movies;
    } catch (error) {
      throw new Error('Error al obtener las películas' + error.message);
    }
  }

  async getMovieById(id: string): Promise<Movies> {
    try {
      const movieExists = await this.movieModel.exists({
        _id: id,
        isDeleted: false,
      });
      if (!movieExists) {
        throw new Error('La película no existe en la base de datos');
      }
      return this.movieModel.findById(id).exec();
    } catch (error) {
      throw new Error('Error al obtener la película' + error.message);
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
      return newMovie.save();
    } catch (error) {
      throw new Error('Error al crear la película' + error.message);
    }
  }

  async updateMovie(id: string, movie: CreateMoviesDTO): Promise<Movies> {
    try {
      const movieExists = await this.movieModel.exists({
        _id: id,
        isDeleted: false,
      });
      if (!movieExists) {
        throw new Error('La película no existe en la base de datos');
      }
      return this.movieModel.findByIdAndUpdate(id, movie, { new: true }).exec();
    } catch (error) {
      throw new Error('Error al actualizar la película' + error.message);
    }
  }

  async deleteMovie(id: string): Promise<Movies> {
    try {
      return this.movieModel
        .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        .exec();
    } catch (error) {
      throw new Error('Error al eliminar la película' + error.message);
    }
  }
}
