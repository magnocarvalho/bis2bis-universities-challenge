import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesSchema } from './interfaces/university.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Universities', schema: UniversitiesSchema }])],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
})
export class UniversitiesModule {}
