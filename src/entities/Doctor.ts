import { BaseEntity } from './BaseEntity';
import { Doctor as DoctorType } from '../types';
import { pool } from '../config/database';

export class DoctorEntity extends BaseEntity<DoctorType> {
  constructor() {
    super('Doctor', 'Id_Doctor');
  }

  async getDoctorWithDetails(doctorId: number): Promise<any> {
    const query = `
      SELECT 
        d.*,
        u.*,
        md.name_medical_degree,
        mp.name_medical_profile,
        mp.descr_medical_profile,
        ARRAY_AGG(json_build_object(
          'id_reception', r.id_reception,
          'reception_date', r.reception_date,
          'reception_time', r.reception_time,
          'patient_info', json_build_object(
            'id_patient', p.id_patient,
            'patient_name', pu.first_name || ' ' || pu.second_name,
            'ambulatory_card_num', ac.ambulatory_card_num
          )
        )) as receptions
      FROM Doctor d
      JOIN Users u ON d.login = u.login
      JOIN Medical_Degree md ON d.id_medical_degree = md.id_medical_degree
      JOIN Medical_Profile mp ON d.id_medical_profile = mp.id_medical_profile
      LEFT JOIN Reception r ON d.id_doctor = r.id_doctor
      LEFT JOIN Ambulatory_Card ac ON r.id_ambulatory_card = ac.id_ambulatory_card
      LEFT JOIN Patient p ON ac.id_patient = p.id_patient
      LEFT JOIN Users pu ON p.login = pu.login
      WHERE d.id_doctor = $1
      GROUP BY d.id_doctor, u.login, md.id_medical_degree, mp.id_medical_profile
    `;
    const result = await pool.query(query, [doctorId]);
    return result.rows[0];
  }

  async getAllWithDetails(): Promise<any[]> {
    const query = `
      SELECT 
        d.*,
        u.*,
        md.name_medical_degree,
        mp.name_medical_profile
      FROM Doctor d
      JOIN Users u ON d.login = u.login
      JOIN Medical_Degree md ON d.id_medical_degree = md.id_medical_degree
      JOIN Medical_Profile mp ON d.id_medical_profile = mp.id_medical_profile
    `;
    const result = await pool.query(query);
    return result.rows;
  }

    async getDoctorByLogin(login: string): Promise<DoctorType> {
      const query = 'SELECT * FROM Doctor WHERE login = $1';
      const result = await pool.query(query, [login]);
      return result.rows[0];
    }
}