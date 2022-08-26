import { Injectable } from '@nestjs/common';
import { IMessage } from './common/interfaces';

@Injectable()
export class AppService {
  getHello(): IMessage {
    return { challenge: 'Criação de API REST para gestão das universidades cadastradas', version: '1.0.0', author: 'Magno Carvalho dos Santos' };
  }
}
