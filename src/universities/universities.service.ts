import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { Like, Repository, Not, IsNull } from 'typeorm';
import { CreateUniversityDto } from './dto/create-university.dto';
import { FilterUniversityDto } from './dto/filter-university.dto';
import { UniversityDto } from './dto/university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { UniversitiesInterface } from './interfaces/university.interface';

@Injectable()
export class UniversitiesService {
  constructor(@InjectModel('Universities') private readonly universityModel: Model<UniversitiesInterface>) {}
  async create(createUniversityDto: CreateUniversityDto) {
    // return this.universityModel.save(createUniversityDto);
    const universitiesFind = await this.universityModel
      .findOne({ country: createUniversityDto.country, 'state-province': createUniversityDto['state-province'], name: createUniversityDto.name })
      .exec();

    if (universitiesFind) {
      throw new BadRequestException('Universities already exist');
    }

    const universitiesNew = new this.universityModel(createUniversityDto);

    return await universitiesNew.save();
  }

  async findAll(pageOptionsDto: FilterUniversityDto): Promise<PageDto<UniversityDto>> {
    try {
      const country = pageOptionsDto.country ? { country: new RegExp(['^', pageOptionsDto.country, '$'].join(''), 'i') } : {};
      const listagem: UniversityDto[] = await this.universityModel
        .find(country)
        .limit(pageOptionsDto.limit)
        .skip(pageOptionsDto.page)
        .sort({ name: pageOptionsDto.order == 'DESC' ? -1 : 1 })
        .exec();
      const qtd = await this.universityModel.count(country);
      return new PageDto(listagem, pageOptionsDto, qtd);
    } catch (error) {
      throw new NotFoundException('Universities not Exist');
    }
  }

  async findOne(id: string): Promise<UniversityDto> {
    return await this.universityModel.findOne({ _id: id });
  }

  async update(id: string, updateUniversityDto: UpdateUniversityDto) {
    const universitiesFind = await this.universityModel.findOne({ _id: id }).exec();
    if (!universitiesFind) {
      throw new NotFoundException('Universities not Exist');
    }
    return await this.universityModel.findOneAndUpdate({ _id: id }, updateUniversityDto).exec();
  }

  async remove(id: string) {
    return await this.universityModel.findByIdAndDelete(id).exec();
  }
}
