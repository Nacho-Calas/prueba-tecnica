import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MoviesService } from "src/movies/movies.service";


@Injectable()
export class MoviesListener {
    constructor(private readonly moviesService: MoviesService) {}

    // Idealmente deberia configurarse para que se ejecute cada 24 horas
    @Cron(process.env.CRON_SCHEDULE || CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        console.log('Actualizamos las peliculas con la DB');
        await this.moviesService.getAndUpdateMovies();
    }
}