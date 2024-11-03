import { ApiProperty, PartialType } from "@nestjs/swagger";
import { MoviesDTO } from "./movies.dto";
import { IsOptional, } from "class-validator";


export class UpdateMoviesDTO extends PartialType(MoviesDTO) {

    @ApiProperty({
        description: 'El título de la película',
        example: 'A New Hope',
    })
    @IsOptional()
    title?: string;

    @ApiProperty({
        description: 'El ID del episodio',
        example: 4,
    })
    @IsOptional()
    episode_id?: number;

    @ApiProperty({
        description: 'Texto introductorio de la película',
        example: 'It is a period of civil war...',
    })
    @IsOptional()
    opening_crawl?: string;

    @ApiProperty({
        description: 'El director de la película',
        example: 'George Lucas',
    })
    @IsOptional()
    director?: string;

    @ApiProperty({
        description: 'El productor de la película',
        example: 'Gary Kurtz, Rick McCallum',
    })
    @IsOptional()
    producer?: string;

    @ApiProperty({
        description: 'Fecha de estreno',
        example: '1977-05-25',
    })
    @IsOptional()
    release_date?: string;

    @ApiProperty({
        description: 'Lista de URLs de personajes',
        example: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    })
    @IsOptional()
    characters?: string[];

    @ApiProperty({
        description: 'Lista de URLs de planetas',
        example: ['https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/planets/2/'],
    })
    @IsOptional()
    planets?: string[];

    @ApiProperty({
        description: 'Lista de URLs de naves',
        example: ['https://swapi.dev/api/starships/2/', 'https://swapi.dev/api/starships/3/'],
    })
    @IsOptional()
    starships?: string[];

    @ApiProperty({
        description: 'Lista de URLs de vehículos',
        example: ['https://swapi.dev/api/vehicles/4/', 'https://swapi.dev/api/vehicles/6/'],
    })
    @IsOptional()
    vehicles?: string[];

    @ApiProperty({
        description: 'Lista de URLs de especies',
        example: ['https://swapi.dev/api/species/1/', 'https://swapi.dev/api/species/2/'],
    })
    @IsOptional()
    species?: string[];

    @ApiProperty({
        description: 'URL del recurso',
        example: 'https://swapi.dev/api/films/1/',
      })
    @IsOptional()
    url?: string;  




    
}