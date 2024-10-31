import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsUrl, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { MoviesDTO } from './movies.dto';

export class CreateMoviesDTO extends PartialType(MoviesDTO) {
  @ApiProperty({
    description: 'El título de la película',
    example: 'A New Hope',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  title: string;

  @ApiProperty({
    description: 'El ID del episodio',
    example: 4,
  })
  @IsNumber({}, { message: 'El ID del episodio debe ser un número' })
  episode_id: number;

  @ApiProperty({
    description: 'Texto introductorio de la película',
    example: 'It is a period of civil war...',
  })
  @IsString()
  @IsNotEmpty({ message: 'El opening crawl no puede estar vacío' })
  opening_crawl: string;

  @ApiProperty({
    description: 'El director de la película',
    example: 'George Lucas',
  })
  @IsString()
  @IsNotEmpty({ message: 'El director no puede estar vacío' })
  director: string;

  @ApiProperty({
    description: 'El productor de la película',
    example: 'Gary Kurtz, Rick McCallum',
  })
  @IsString()
  @IsNotEmpty({ message: 'El productor no puede estar vacío' })
  producer: string;

  @ApiProperty({
    description: 'Fecha de estreno',
    example: '1977-05-25',
  })
  @IsDateString({}, { message: 'La fecha debe estar en formato ISO (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de estreno no puede estar vacía' })
  release_date: string;

  @ApiProperty({
    description: 'Lista de URLs de personajes',
    example: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
  })
  @IsArray()
  @IsUrl({}, { each: true, message: 'Cada elemento en characters debe ser una URL válida' })
  @IsOptional()
  characters?: string[];

  @ApiProperty({
    description: 'Lista de URLs de planetas',
    example: ['https://swapi.dev/api/planets/1/'],
  })
  @IsArray()
  @IsUrl({}, { each: true, message: 'Cada elemento en planets debe ser una URL válida' })
  @IsOptional()
  planets?: string[];

  @ApiProperty({
    description: 'Lista de URLs de naves espaciales',
    example: ['https://swapi.dev/api/starships/2/'],
  })
  @IsArray()
  @IsUrl({}, { each: true, message: 'Cada elemento en starships debe ser una URL válida' })
  @IsOptional()
  starships?: string[];

  @ApiProperty({
    description: 'Lista de URLs de vehículos',
    example: ['https://swapi.dev/api/vehicles/4/'],
  })
  @IsArray()
  @IsUrl({}, { each: true, message: 'Cada elemento en vehicles debe ser una URL válida' })
  @IsOptional()
  vehicles?: string[];

  @ApiProperty({
    description: 'Lista de URLs de especies',
    example: ['https://swapi.dev/api/species/1/'],
  })
  @IsArray()
  @IsUrl({}, { each: true, message: 'Cada elemento en species debe ser una URL válida' })
  @IsOptional()
  species?: string[];

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2014-12-10T14:23:31.880000Z',
  })
  @IsDateString({}, { message: 'La fecha creada debe estar en formato ISO' })
  @IsOptional()
  created?: string;

  @ApiProperty({
    description: 'Fecha de última edición del registro',
    example: '2014-12-20T19:49:45.256000Z',
  })
  @IsDateString({}, { message: 'La fecha editada debe estar en formato ISO' })
  @IsOptional()
  edited?: string;

  @ApiProperty({
    description: 'URL del recurso',
    example: 'https://swapi.dev/api/films/1/',
  })
  @IsUrl({}, { message: 'La URL debe ser válida' })
  @IsOptional()
  url?: string;
}