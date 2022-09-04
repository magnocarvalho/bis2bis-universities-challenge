import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, MaxLength } from 'class-validator';
import { PageOptionsDto } from '../../common/dtos';

export class FilterUniversityDto extends PageOptionsDto {
  @IsOptional()
  @MaxLength(25)
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: 'The country name of the university', example: 'Brazil' })
  readonly country?: string = null;
}
