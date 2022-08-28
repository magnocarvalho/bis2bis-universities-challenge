import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateUniversityDto } from './create-university.dto';

export class UpdateUniversityDto {
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
