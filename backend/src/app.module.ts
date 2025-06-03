import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DB_CONFIG } from './config/typeorm.config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { AdoptersModule } from './module/adopters/adopters.module';
import { PetModule } from './module/pets/pet.module';
import { FilesModule } from './module/files/files.module';
import { MatchesModule } from './module/matches/matches.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DB_CONFIG),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 900000,
          limit: 3,
        },
      ],
    }),
    AuthModule,
    UsersModule,
    AdoptersModule,
    PetModule,
    FilesModule,
    MatchesModule,
  ],
})
export class AppModule {}
