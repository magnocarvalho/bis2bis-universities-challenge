import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { Like, Repository, Not, IsNull } from 'typeorm';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UniversityDto } from './dto/university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { UniversityEntity } from './entity/universities.entity';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(UniversityEntity)
    private universityRepository: Repository<UniversityEntity>
  ) {}
  create(createUniversityDto: CreateUniversityDto) {
    return this.universityRepository.save(createUniversityDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UniversityDto>> {
    try {
      const [listagem, qtd] = await this.universityRepository.findAndCount({
        order: {
          name: pageOptionsDto.order || 'DESC',
        },
        where: { country: pageOptionsDto.country },
        skip: pageOptionsDto.page,
        take: pageOptionsDto.limit,
      });
      return new PageDto(listagem as UniversityDto[], pageOptionsDto, qtd);
    } catch (error) {
      throw new NotFoundException('Universities not Exist');
    }
  }

  async findOne(id: string): Promise<UniversityDto> {
    return await this.universityRepository.findOne({ where: { _id: id } });
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}
