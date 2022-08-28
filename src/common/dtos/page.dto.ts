import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageOptionsDto } from './page-options.dto';

export class PageDto<T> {
  @ApiProperty({ description: 'The page of results' })
  readonly page: number;

  @ApiProperty({ description: 'The number of results per page' })
  readonly limit: number;

  @ApiProperty({ description: 'The total number of results' })
  readonly totalDocs: number;

  @ApiProperty({ description: 'The total results of the all page' })
  readonly totalPages: number;

  @ApiProperty({ description: 'The hasNext of the page' })
  readonly hasNext: boolean;

  @ApiProperty({ description: 'The hasPrev of the page' })
  readonly hasPrev: boolean;

  @IsArray()
  @ApiProperty({ isArray: true, description: 'The results of the page' })
  readonly results: T[];

  constructor(results: T[], pageOptionsDto: PageOptionsDto, totalDocs: number) {
    this.results = results;
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.totalDocs = totalDocs;
    this.totalPages = Math.ceil(this.totalDocs / this.limit);
    this.hasNext = this.page > 1;
    this.hasPrev = this.page < this.totalPages;
  }
}
