import { Router, Request, Response } from 'express';
import { UserEntity } from '../entities/User';
import { DoctorEntity } from '../entities/Doctor';
import { CreateDoctorRequest } from '../types';

const router = Router();
const userEntity = new UserEntity();
const doctorEntity = new DoctorEntity();

// Создать доктора
router.post('/', async (req: Request, res: Response) => {
  try {
    const createDoctorData: CreateDoctorRequest = req.body;
    
    if (!createDoctorData.login || !createDoctorData.password) {
      return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }

    // Разделяем данные пользователя и доктора
    const { id_medical_degree, id_medical_profile, ...userData } = createDoctorData;
    
    const result = await userEntity.createDoctor(
      { ...userData, role_name: 'doctor' },
      { id_medical_degree, id_medical_profile }
    );
    
    res.status(201).json({
      message: 'Доктор успешно создан',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить всех докторов с деталями
router.get('/', async (req: Request, res: Response) => {
  try {
    const doctors = await doctorEntity.getAllWithDetails();
    res.json(doctors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить доктора по ID с деталями
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const doctor = await doctorEntity.getDoctorWithDetails(parseInt(req.params.id));
    
    if (!doctor) {
      return res.status(404).json({ error: 'Доктор не найден' });
    }
    
    res.json(doctor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить доктора
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDoctor = await doctorEntity.update(parseInt(req.params.id), req.body);
    
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Доктор не найден' });
    }
    
    res.json(updatedDoctor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;