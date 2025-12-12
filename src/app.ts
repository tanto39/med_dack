import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import doctorRoutes from './routes/doctor.routes';
import patientRoutes from './routes/patient.routes';
import medicalRoutes from './routes/medical.routes';
import receptionRoutes from './routes/reception.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Проверка кодировки для всех запросов
app.use((req, res, next) => {
  // Установка кодировки для ответов
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/medical', medicalRoutes);
app.use('/api/receptions', receptionRoutes);

// Health check с проверкой БД
app.get('/health', async (req, res) => {
  try {
    const { pool } = require('./config/database');
    await pool.query('SELECT 1');
    res.json({ 
      status: 'OK', 
      timestamp: new Date(),
      database: 'Connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date(),
      database: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware с правильной кодировкой
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  
  // Конвертируем сообщение об ошибке в UTF-8
  const errorMessage = Buffer.from(err.message || 'Что-то пошло не так!', 'utf8').toString('utf8');
  
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: errorMessage
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Проверяем подключение к БД
  await testConnection();
});