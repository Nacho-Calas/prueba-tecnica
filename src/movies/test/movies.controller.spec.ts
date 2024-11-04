import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { CreateMoviesDTO } from '../dto/createMovies.dto';
import { UpdateMoviesDTO } from '../dto/updateMovies.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';


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
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
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
  });
});
