import { Router, Request, Response } from 'express';
import { UserEntity } from '../entities/User';

const router = Router();
const userEntity = new UserEntity();

// Получить всех пользователей
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userEntity.getAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Получить пользователя по логину
router.get('/:login', async (req: Request, res: Response) => {
  try {
    const user = await userEntity.getById(req.params.login);
    
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Обновить пользователя
router.put('/:login', async (req: Request, res: Response) => {
  try {
    const updatedUser = await userEntity.update(req.params.login, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;