import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MoviesService } from "src/movies/movies.service";


@Injectable()
export class MoviesListener {
    constructor(private readonly moviesService: MoviesService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        console.log('Actualizamos las peliculas con la DB');
        await this.moviesService.getAndUpdateMovies();
    }
}