import { Router, Request, Response } from 'express';
import { PatientEntity } from '../entities/Patient';

const router = Router();
const patientEntity = new PatientEntity();

// Получить пациента по ID с деталями
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const patient = await patientEntity.getPatientWithDetails(parseInt(req.params.id));
    
    if (!patient) {
      return res.status(404).json({ error: 'Пациент не найден' });
    }
    
    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить пациента
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedPatient = await patientEntity.update(parseInt(req.params.id), req.body);
    
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Пациент не найден' });
    }
    
    res.json(updatedPatient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;