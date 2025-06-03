import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { Users } from '../users/entities/users.entity';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Match } from '../matches/entities/match.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Pet, Users, Match]),
    AuthModule,
    FilesModule,
  ],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
