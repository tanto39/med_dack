import { BaseEntity } from './BaseEntity';
import { Reception as ReceptionType } from '../types';
import { pool } from '../config/database';

export class ReceptionEntity extends BaseEntity<ReceptionType> {
  constructor() {
    super('Reception', 'Id_Reception');
  }

  async getReceptionWithDetails(receptionId: number): Promise<any> {
    const query = `
      SELECT 
        r.*,
        dg.diagnos_name,
        s.complaint,
        s.medication_text,
        ss.sick_sheet_num,
        ss.sick_sheet_date,
        ss.next_date,
        ARRAY_AGG(json_build_object(
          'medicament_name', m.medicament_name,
          'medicament_descr', m.medicament_descr
        )) as medicaments,
        json_build_object(
          'id_patient', p.id_patient,
          'patient_name', pu.first_name || ' ' || pu.second_name,
          'snils', p.snils
        ) as patient_info,
        json_build_object(
          'id_doctor', d.id_doctor,
          'doctor_name', du.first_name || ' ' || du.second_name,
          'medical_profile', mp.name_medical_profile
        ) as doctor_info
      FROM Reception r
      JOIN Sickness s ON r.id_reception = s.id_reception
      JOIN Diagnos dg ON s.id_diagnos = dg.id_diagnos
      LEFT JOIN Sick_Sheet ss ON s.id_sickness = ss.id_sickness
      LEFT JOIN Medication med ON s.id_sickness = med.id_sickness
      LEFT JOIN Medicament m ON med.id_medicament = m.id_medicament
      JOIN Ambulatory_Card ac ON r.id_ambulatory_card = ac.id_ambulatory_card
      JOIN Patient p ON ac.id_patient = p.id_patient
      JOIN Users pu ON p.login = pu.login
      JOIN Doctor d ON r.id_doctor = d.id_doctor
      JOIN Users du ON d.login = du.login
      JOIN Medical_Profile mp ON d.id_medical_profile = mp.id_medical_profile
      WHERE r.id_reception = $1
      GROUP BY r.id_reception, dg.id_diagnos, s.id_sickness, ss.id_sick_sheet, p.id_patient, pu.login, d.id_doctor, du.login, mp.id_medical_profile
    `;
    const result = await pool.query(query, [receptionId]);
    return result.rows[0];
  }
}