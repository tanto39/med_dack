import { Router, Request, Response } from 'express';
import { ReceptionEntity } from '../entities/Reception';

const router = Router();
const receptionEntity = new ReceptionEntity();

// Создать прием
router.post('/', async (req: Request, res: Response) => {
  try {
    const reception = await receptionEntity.create(req.body);
    res.status(201).json(reception);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить прием по ID с деталями
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const reception = await receptionEntity.getReceptionWithDetails(parseInt(req.params.id));
    
    if (!reception) {
      return res.status(404).json({ error: 'Прием не найден' });
    }
    
    res.json(reception);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить прием
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedReception = await receptionEntity.update(parseInt(req.params.id), req.body);
    
    if (!updatedReception) {
      return res.status(404).json({ error: 'Прием не найден' });
    }
    
    res.json(updatedReception);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;