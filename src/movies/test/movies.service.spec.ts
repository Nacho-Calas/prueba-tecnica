import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movies } from '../../database/schemas/movies.schema';
import { CreateMoviesDTO } from '../dto/createMovies.dto';
import { UpdateMoviesDTO } from '../dto/updateMovies.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let movieModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movies.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    movieModel = module.get(getModelToken(Movies.name));
  });

  describe('getMovies', () => {
    it('debería devolver una lista de películas', async () => {
      const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
      movieModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockMovies),
      });

      const result = await moviesService.getMovies();
      expect(result).toEqual(mockMovies);
    });

    it('debería lanzar un HttpException si ocurre un error', async () => {
      movieModel.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(moviesService.getMovies()).rejects.toThrow(
        'Error al obtener las películas: Database error',
      );
    });
  });

  describe('getMovieById', () => {
    it('debería devolver una película si existe', async () => {
      const mockMovie = { title: 'Movie 1', deletedAt: null };
      movieModel.exists.mockResolvedValue(true);
      movieModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockMovie),
      });

      const result = await moviesService.getMovieById('123');
      expect(result).toEqual(mockMovie);
    });

    it('debería lanzar un error si la película no existe', async () => {
      movieModel.exists.mockResolvedValue(false);

      await expect(moviesService.getMovieById('123')).rejects.toThrow(
        'Error al obtener la película: La película no existe en la base de datos',
      );
    });
  });

  describe('createMovie', () => {
    it('debería crear una nueva película si no existe', async () => {
      const createMovieDto: CreateMoviesDTO = {
        title: 'New Movie',
        episode_id: 1,
        director: 'Director',
        release_date: '2021-01-01',
      };
      movieModel.exists.mockResolvedValue(false);
      movieModel.create.mockResolvedValue(createMovieDto);

      const result = await moviesService.createMovie(createMovieDto);
      expect(result).toEqual(createMovieDto);
    });

    it('debería lanzar un error si la película ya existe', async () => {
      movieModel.exists.mockResolvedValue(true);

      await expect(
        moviesService.createMovie({
          title: 'Existing Movie',
          episode_id: 1,
          director: 'Director',
          release_date: '2021-01-01',
        }),
      ).rejects.toThrow('Error al crear la película: La película ya existe en la base de datos');
    });
  });

  describe('deleteMovie', () => {
    it('debería marcar una película como eliminada', async () => {
      const mockResponse = { deletedAt: Date.now() };
      movieModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await moviesService.deleteMovie('123');
      expect(result).toEqual(mockResponse);
    });

    it('debería lanzar un error si ocurre un problema al eliminar', async () => {
      movieModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new HttpException('Error al eliminar la película: Database error', HttpStatus.INTERNAL_SERVER_ERROR)),
      });

      await expect(moviesService.deleteMovie('123')).rejects.toThrow(
        'Error al eliminar la película: Database error',
      );
    });
  });
});
