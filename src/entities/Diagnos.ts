import { BaseEntity } from './BaseEntity';
import { Diagnos as DiagnosType } from '../types';

export class DiagnosEntity extends BaseEntity<DiagnosType> {
  constructor() {
    super('Diagnos', 'Id_Diagnos');
  }
}