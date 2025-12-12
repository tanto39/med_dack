import { Router, Request, Response } from 'express';
import { UserEntity } from '../entities/User';
import { PatientEntity } from '../entities/Patient';
import { LoginRequest, RegisterRequest } from '../types';

const router = Router();
const userEntity = new UserEntity();
const patientEntity = new PatientEntity();

// Регистрация пользователя
router.post('/register', async (req: Request, res: Response) => {
  try {
    const registerData: RegisterRequest = req.body;
    
    if (!registerData.login || !registerData.password) {
      return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }

    // Разделяем данные пользователя и пациента
    const { patientData, ...userData } = registerData;
    
    const result = await userEntity.register(userData, patientData);
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Авторизация
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { login, password }: LoginRequest = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }

    const user = await userEntity.authenticate(login, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }

    // Получаем дополнительную информацию в зависимости от роли
    let additionalInfo = {};
    if (user.role_name === 'patient') {
      const patients = await patientEntity.getPatientsByLogin(user.login);
      additionalInfo = { patient: patients[0] };
    }

    res.json({
      message: 'Авторизация успешна',
      user,
      ...additionalInfo
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;