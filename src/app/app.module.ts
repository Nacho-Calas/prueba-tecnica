import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MoviesListener } from 'src/database/listeners/movies.listener';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_URI_BACK,
      }),
    }),
    AuthModule,
    MoviesModule
  ],
  providers: [MoviesListener],
})
export class AppModule {}
