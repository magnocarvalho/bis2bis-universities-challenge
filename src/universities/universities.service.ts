import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { Like, Repository } from 'typeorm';
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
    return 'This action adds a new university';
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UniversityDto>> {
    const whereOption = { name: undefined, country: undefined, 'state-province': undefined };
    for (const key in whereOption) {
      if (Object.prototype.hasOwnProperty.call(whereOption, key)) {
        const element = whereOption[key];
        if (element) {
          whereOption[key] = Like(`%${element}%`);
        }
      }
    }
    const [listagem, qtd] = await this.universityRepository.findAndCount({
      order: {
        name: pageOptionsDto.order || 'DESC',
      },
      where: whereOption,
      skip: pageOptionsDto.page,
      take: pageOptionsDto.limit,
    });
    return new PageDto(listagem as UniversityDto[], pageOptionsDto, qtd);
  }

  findOne(id: number) {
    return `This action returns a #${id} university`;
  }

  update(id: number, updateUniversityDto: UpdateUniversityDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: number) {
    return `This action removes a #${id} university`;
  }
}
