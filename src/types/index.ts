export interface User {
  login: string;
  password: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: 'patient' | 'doctor' | 'admin';
}

export interface Patient {
  id_patient?: number;
  login: string;
  snils: string;
  policy_foms: number;
  phone_number: string;
  e_mail: string;
}

export interface Doctor {
  id_doctor?: number;
  login: string;
  id_medical_degree: number;
  id_medical_profile: number;
}

export interface MedicalProfile {
  id_medical_profile?: number;
  name_medical_profile: string;
  descr_medical_profile?: string;
}

export interface Reception {
  id_reception?: number;
  reception_date: Date;
  reception_time: string;
  id_ambulatory_card: number;
  id_doctor: number;
}

export interface Sickness {
  id_sickness?: number;
  id_diagnos: number;
  id_reception: number;
  complaint?: string;
  medication_text?: string;
}

export interface AmbulatoryCard {
  id_ambulatory_card?: number;
  ambulatory_card_num: number;
  registration_date: Date;
  registration_date_end?: Date;
  id_patient: number;
}

export interface SickSheet {
  id_sick_sheet?: number;
  sick_sheet_num: number;
  sick_sheet_date: Date;
  next_date?: Date;
  id_sickness: number;
}

export interface Diagnos {
  id_diagnos?: number;
  diagnos_name: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: 'patient' | 'doctor' | 'admin';
  patientData?: Omit<Patient, 'login'>;
}

export interface CreateDoctorRequest {
  login: string;
  password: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  id_medical_degree: number;
  id_medical_profile: number;
}