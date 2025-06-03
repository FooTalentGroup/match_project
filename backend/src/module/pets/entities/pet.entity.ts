import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  PetAge,
  PetEnergy,
  PetSex,
  PetSize,
  PetSpecies,
  PetStatus,
  PetTrait,
} from '../../../common/enums/pet.enum';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Match } from 'src/module/matches/entities/match.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre debe contener solo letras' })
  name: string;

  @Column({
    type: 'enum',
    enum: PetSize,
  })
  @IsEnum(PetSize)
  size: PetSize;

  @Column({
    type: 'enum',
    enum: PetSex,
  })
  @IsEnum(PetSex)
  sex: PetSex;

  @Column({
    type: 'enum',
    enum: PetAge,
  })
  @IsEnum(PetAge)
  age: PetAge;

  @Column({
    type: 'enum',
    enum: PetSpecies,
  })
  @IsEnum(PetSpecies)
  species: PetSpecies;

  @Column({
    type: 'enum',
    enum: PetEnergy,
  })
  @IsEnum(PetEnergy)
  energy: PetEnergy;

  @Column()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, { message: 'La raza debe contener solo letras' })
  breed: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @IsNumber()
  @Min(0)
  @Max(100)
  kg: number;

  @Column()
  @IsBoolean()
  isVaccinated: boolean;

  @Column()
  @IsBoolean()
  isSterilized: boolean;

  @Column()
  @IsBoolean()
  isDewormed: boolean;

  @Column()
  @IsBoolean()
  hasMicrochip: boolean;

  @Column({ type: 'text' })
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?()-]+$/, {
    message: 'La historia contiene caracteres inválidos',
  })
  story: string;

  @Column({
    type: 'enum',
    enum: PetTrait,
    array: true,
  })
  @IsArray()
  @IsEnum(PetTrait, { each: true })
  traits: PetTrait[];

  @Column({ type: 'date' })
  @IsDate()
  admissionDate: Date;

  @Column('simple-array')
  @IsArray()
  @IsUrl({}, { each: true, message: 'Las URLs de fotos deben ser válidas' })
  photoUrls: string[];

  @Column({
    type: 'enum',
    enum: PetStatus,
    default: PetStatus.AVAILABLE,
  })
  @IsEnum(PetStatus)
  status: PetStatus;

  @Column({ default: true, select: false })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => Match, (match) => match.pet)
  matches: Match[];
}
