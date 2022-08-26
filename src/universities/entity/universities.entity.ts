import { Entity, ObjectIdColumn, ObjectID, Unique, Column, Index } from 'typeorm';
import { University } from '../entities/university.entity';

@Entity({ name: 'universities' })
@Unique(['country', 'name', 'state-province'])
export class UniversityEntity implements University {
  @ObjectIdColumn()
  _id: string;
  @Column()
  domains: string[];
  @Column({ length: 2 })
  @Index()
  alpha_two_code: string;
  @Column()
  @Index()
  country: string;
  @Column()
  web_pages: string[];
  @Column()
  @Index()
  name: string;
  @Column()
  'state-province'?: string;
}
