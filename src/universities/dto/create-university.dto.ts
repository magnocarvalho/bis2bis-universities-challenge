import { IsArray, IsNotEmpty, MaxLength } from 'class-validator';
import { University } from '../entities/university.entity';

export class CreateUniversityDto implements University {
  @IsNotEmpty()
  @IsArray()
  domains: string[];
  @MaxLength(2)
  alpha_two_code: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  @IsArray()
  web_pages: string[];
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  'state-province'?: string;
}
