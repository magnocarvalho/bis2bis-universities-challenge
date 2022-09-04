import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from '../common/dtos';
import { UniversityDto } from './dto/university.dto';
import { ApiPaginatedResponse } from '../common/decorators';
import { FilterUniversityDto } from './dto/filter-university.dto';

@Controller('universities')
@ApiTags('Universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  /**
   * @description PostCreateUniversityDto by name and country
   *
   * @param {CreateUniversityDto} createUniversityDto
   * @return {*}
   * @memberof UniversitiesController
   */
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }
  /**
   * GetALL - Get all universities with filters
   *
   * @param {FilterUniversityDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<UniversityDto>>}
   * @memberof UniversitiesController
   */
  @Get()
  @ApiPaginatedResponse(UniversityDto)
  @UsePipes(ValidationPipe)
  async findAll(@Query() pageOptionsDto: FilterUniversityDto): Promise<PageDto<UniversityDto>> {
    return await this.universitiesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiPaginatedResponse(UniversityDto)
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: string): Promise<UniversityDto> {
    return this.universitiesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiPaginatedResponse(UniversityDto)
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto): Promise<UniversityDto> {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
