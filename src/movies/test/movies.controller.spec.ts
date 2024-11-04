import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { CreateMoviesDTO } from '../dto/createMovies.dto';
import { UpdateMoviesDTO } from '../dto/updateMovies.dto';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Movies } from '../../database/schemas/movies.schema';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  const mockMoviesService = {
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
    createMovie: jest.fn(),
    updateMovie: jest.fn(),
    deleteMovie: jest.fn(),
  };

  const mockMoviesModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: getModelToken(Movies.name), useValue: mockMoviesModel },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: jest.fn(() => true) })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('debería devolver una lista de películas', async () => {
      const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
      mockMoviesService.getMovies.mockResolvedValue(mockMovies);

      const result = await moviesController.getMovies();
      expect(result).toEqual({
        message: 'Lista de películas',
        movies: mockMovies,
        status: HttpStatus.OK,
      });
    });

    it('debería lanzar un error si ocurre un problema al obtener las películas', async () => {
      mockMoviesService.getMovies.mockRejectedValue(new Error('Database error'));

      await expect(moviesController.getMovies()).rejects.toThrow(
        new HttpException(
          'Error al obtener las películas: Database error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getMovieById', () => {
    it('debería devolver una película por ID', async () => {
      const mockMovie = { title: 'Movie 1' };
      mockMoviesService.getMovieById.mockResolvedValue(mockMovie);

      const result = await moviesController.getMovieById({ params: { id: '123' } } as any);
      expect(result).toEqual({
        message: 'Película encontrada',
        movie: mockMovie,
        status: HttpStatus.OK,
      });
    });

    it('debería lanzar un error si la película no existe', async () => {
      mockMoviesService.getMovieById.mockRejectedValue(new Error('La película no existe'));

      await expect(
        moviesController.getMovieById({ params: { id: '123' } } as any),
      ).rejects.toThrow(
        new HttpException(
          'Error al obtener la película: La película no existe',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('createMovie', () => {
    it('debería crear una nueva película', async () => {
      const createMovieDto: CreateMoviesDTO = {
        title: 'New Movie',
        episode_id: 1,
        director: 'Director',
        release_date: '2021-01-01',
      };
      mockMoviesService.createMovie.mockResolvedValue(createMovieDto);

      const result = await moviesController.createMovie(createMovieDto);
      expect(result).toEqual({
        message: 'Película creada',
        movieCreated: createMovieDto,
        status: HttpStatus.OK,
      });
    });

    it('debería lanzar un error si la película ya existe', async () => {
      const createMovieDto: CreateMoviesDTO = {
        title: 'Existing Movie',
        episode_id: 1,
        director: 'Director',
        release_date: '2021-01-01',
      };
      mockMoviesService.createMovie.mockRejectedValue(new Error('La película ya existe'));

      await expect(moviesController.createMovie(createMovieDto)).rejects.toThrow(
        new HttpException(
          'Error al crear la película: La película ya existe',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('updateMovie', () => {
    it('debería actualizar una película existente', async () => {
      const updateMovieDto: UpdateMoviesDTO = { title: 'Updated Movie' };
      const updatedMovie = { ...updateMovieDto, updatedAt: Date.now() };
      mockMoviesService.updateMovie.mockResolvedValue(updatedMovie);

      const result = await moviesController.updateMovie({ params: { id: '123' } } as any, updateMovieDto);
      expect(result).toEqual({
        message: 'Película actualizada',
        movieUpdated: updatedMovie,
        status: HttpStatus.OK,
      });
    });

    it('debería lanzar un error si la película no existe para actualizar', async () => {
      const updateMovieDto: UpdateMoviesDTO = { title: 'Updated Movie' };
      mockMoviesService.updateMovie.mockRejectedValue(new Error('La película no existe'));

      await expect(
        moviesController.updateMovie({ params: { id: '123' } } as any, updateMovieDto),
      ).rejects.toThrow(
        new HttpException(
          'Error al actualizar la película: La película no existe',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('deleteMovie', () => {
    it('debería eliminar una película', async () => {
      mockMoviesService.deleteMovie.mockResolvedValue(null);

      const result = await moviesController.deleteMovie({ params: { id: '123' } } as any);
      expect(result).toEqual({
        message: 'Película eliminada',
        status: HttpStatus.OK,
      });
    });

    it('debería lanzar un error si ocurre un problema al eliminar la película', async () => {
      mockMoviesService.deleteMovie.mockRejectedValue(new Error('Error al eliminar'));

      await expect(
        moviesController.deleteMovie({ params: { id: '123' } } as any),
      ).rejects.toThrow(
        new HttpException(
          'Error al eliminar la película: Error al eliminar',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
