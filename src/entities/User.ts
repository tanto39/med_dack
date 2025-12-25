import { BaseEntity } from "./BaseEntity";
import { User as UserType, Patient as PatientType, RegisterRequest } from "../types";
import { pool } from "../config/database";
import { PatientEntity } from "./Patient";
import { DoctorEntity } from "./Doctor";

export class UserEntity extends BaseEntity<UserType> {
  constructor() {
    super("Users", "Login");
  }

  async register(registerData: RegisterRequest): Promise<any> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Создаем пользователя
      const userData: UserType = { login: registerData.login, role_name: "patient", password: registerData.password };
      const newUser = await this.create(userData);

      // Если это пациент создаем запись в таблице Patient
      const patientData: PatientType = { login: registerData.login };
      const patientEntity = new PatientEntity();
      const newPatient = await patientEntity.create(patientData);

      await client.query("COMMIT");
      return { user: newUser, patient: newPatient };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async createDoctor(userData: UserType, doctorData: any): Promise<any> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Создаем пользователя с ролью doctor
      const newUser = await this.create(userData);

      // Создаем запись в таблице Doctor
      const doctorEntity = new DoctorEntity();
      const newDoctor = await doctorEntity.create({
        ...doctorData,
        login: userData.login,
      });

      await client.query("COMMIT");
      return { user: newUser, doctor: newDoctor };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async authenticate(login: string, password: string): Promise<UserType | null> {
    const query = "SELECT * FROM Users WHERE login = $1 AND password = $2";
    const result = await pool.query(query, [login, password]);
    return result.rows[0] || null;
  }
  
}
