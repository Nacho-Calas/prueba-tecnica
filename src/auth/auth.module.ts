import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/database/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema}]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
