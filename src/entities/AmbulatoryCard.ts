import { BaseEntity } from './BaseEntity';
import { AmbulatoryCard as AmbulatoryCardType } from '../types';

export class AmbulatoryCardEntity extends BaseEntity<AmbulatoryCardType> {
  constructor() {
    super('Ambulatory_Card', 'Id_Ambulatory_Card');
  }
}