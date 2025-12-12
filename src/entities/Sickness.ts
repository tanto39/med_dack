import { BaseEntity } from './BaseEntity';
import { Sickness as SicknessType } from '../types';

export class SicknessEntity extends BaseEntity<SicknessType> {
  constructor() {
    super('Sickness', 'Id_Sickness');
  }
}