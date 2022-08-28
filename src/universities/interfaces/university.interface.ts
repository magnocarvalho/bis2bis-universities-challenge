import { Document } from 'mongoose';
import { University } from '../entities/university.entity';
export interface UniversitiesInterface extends Document {
  domains: string[];
  alpha_two_code: string;
  country: string;
  web_pages: string[];
  name: string;
  'state-province'?: string;
}
