import { BaseEntity } from './BaseEntity';
import { MedicalProfile as MedicalProfileType } from '../types';

export class MedicalProfileEntity extends BaseEntity<MedicalProfileType> {
  constructor() {
    super('Medical_Profile', 'Id_Medical_Profile');
  }
}