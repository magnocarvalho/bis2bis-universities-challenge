import { IsArray, IsNotEmpty, MaxLength } from 'class-validator';
import { University } from '../entities/university.entity';

export class UniversityDto {
  _id: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  'state-province'?: string;
}
