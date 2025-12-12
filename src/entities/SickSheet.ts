import { BaseEntity } from './BaseEntity';
import { SickSheet as SickSheetType } from '../types';

export class SickSheetEntity extends BaseEntity<SickSheetType> {
  constructor() {
    super('Sick_Sheet', 'Id_Sick_Sheet');
  }
}