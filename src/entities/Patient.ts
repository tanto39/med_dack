import { BaseEntity } from './BaseEntity';
import { Patient as PatientType } from '../types';
import { pool } from '../config/database';

export class PatientEntity extends BaseEntity<PatientType> {
  constructor() {
    super('Patient', 'Id_Patient');
  }

  async getPatientWithDetails(patientId: number): Promise<any> {
    const query = `
      SELECT 
        p.*,
        u.*,
        ac.*,
        ARRAY_AGG(json_build_object(
          'id_reception', r.id_reception,
          'reception_date', r.reception_date,
          'reception_time', r.reception_time,
          'doctor_info', json_build_object(
            'id_doctor', d.id_doctor,
            'doctor_name', du.first_name || ' ' || du.second_name,
            'medical_profile', mp.name_medical_profile
          )
        )) as receptions
      FROM Patient p
      JOIN Users u ON p.login = u.login
      LEFT JOIN Ambulatory_Card ac ON p.id_patient = ac.id_patient
      LEFT JOIN Reception r ON ac.id_ambulatory_card = r.id_ambulatory_card
      LEFT JOIN Doctor d ON r.id_doctor = d.id_doctor
      LEFT JOIN Users du ON d.login = du.login
      LEFT JOIN Medical_Profile mp ON d.id_medical_profile = mp.id_medical_profile
      WHERE p.id_patient = $1
      GROUP BY p.id_patient, u.login, ac.id_ambulatory_card
    `;
    const result = await pool.query(query, [patientId]);
    return result.rows[0];
  }

  async getPatientByLogin(login: string): Promise<PatientType> {
    const query = 'SELECT * FROM Patient WHERE login = $1';
    const result = await pool.query(query, [login]);
    return result.rows[0];
  }
}