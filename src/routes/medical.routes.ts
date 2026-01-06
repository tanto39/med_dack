import { Router, Request, Response } from 'express';
import { MedicalProfileEntity } from '../entities/MedicalProfile';
import { SicknessEntity } from '../entities/Sickness';
import { AmbulatoryCardEntity } from '../entities/AmbulatoryCard';
import { SickSheetEntity } from '../entities/SickSheet';
import { DiagnosEntity } from '../entities/Diagnos';
import { ApiResponseBuilder } from '../utils/apiResponse';

const router = Router();
const medicalProfileEntity = new MedicalProfileEntity();
const sicknessEntity = new SicknessEntity();
const ambulatoryCardEntity = new AmbulatoryCardEntity();
const sickSheetEntity = new SickSheetEntity();
const diagnosEntity = new DiagnosEntity();

// Лечебные профили
router.get('/profiles', async (req: Request, res: Response) => {
  try {
    const profiles = await medicalProfileEntity.getAll();
    const response = ApiResponseBuilder.success(profiles);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/profiles', async (req: Request, res: Response) => {
  try {
    const profile = await medicalProfileEntity.create(req.body);
    const response = ApiResponseBuilder.success(profile);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profiles/:id', async (req: Request, res: Response) => {
  try {
    const updatedProfile = await medicalProfileEntity.update(parseInt(req.params.id), req.body);
    const response = ApiResponseBuilder.success(updatedProfile);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Болезни (Sickness)
router.post('/sickness', async (req: Request, res: Response) => {
  try {
    const sickness = await sicknessEntity.create(req.body);
    res.status(201).json(sickness);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/sickness/:id', async (req: Request, res: Response) => {
  try {
    const updatedSickness = await sicknessEntity.update(parseInt(req.params.id), req.body);
    res.json(updatedSickness);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Амбулаторные карты
router.post('/ambulatory-cards', async (req: Request, res: Response) => {
  try {
    const card = await ambulatoryCardEntity.create(req.body);
    res.status(201).json(card);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/ambulatory-cards/:id', async (req: Request, res: Response) => {
  try {
    const updatedCard = await ambulatoryCardEntity.update(parseInt(req.params.id), req.body);
    res.json(updatedCard);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Больничные листы
router.post('/sick-sheets', async (req: Request, res: Response) => {
  try {
    const sheet = await sickSheetEntity.create(req.body);
    res.status(201).json(sheet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/sick-sheets/:id', async (req: Request, res: Response) => {
  try {
    const updatedSheet = await sickSheetEntity.update(parseInt(req.params.id), req.body);
    res.json(updatedSheet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Диагнозы
router.get('/diagnoses', async (req: Request, res: Response) => {
  try {
    const diagnoses = await diagnosEntity.getAll();
    res.json(diagnoses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/diagnoses', async (req: Request, res: Response) => {
  try {
    const diagnos = await diagnosEntity.create(req.body);
    res.status(201).json(diagnos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/diagnoses/:id', async (req: Request, res: Response) => {
  try {
    const updatedDiagnos = await diagnosEntity.update(parseInt(req.params.id), req.body);
    res.json(updatedDiagnos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;