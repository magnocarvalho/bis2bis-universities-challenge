import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [UniversitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
