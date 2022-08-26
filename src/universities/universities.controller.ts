import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { University } from './entities/university.entity';
import { UniversityDto } from './dto/university.dto';
import { ApiPaginatedResponse } from 'src/common/decorators';

@Controller('universities')
@ApiTags('Universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }
  /**
   * GetALL - Get all universities with filters
   *
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<UniversityDto>>}
   * @memberof UniversitiesController
   */
  @Get()
  @ApiPaginatedResponse(UniversityDto)
  @UsePipes(ValidationPipe)
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UniversityDto>> {
    return await this.universitiesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universitiesService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(+id);
  }
}
