import express from 'express';
import cors from 'cors';
import connectDB from '../server/config/db.js';
import { errorHandler, notFound } from '../server/middlewares/errorHandler.js';
import { checkDbConnection } from '../server/middlewares/dbCheck.js';
import goatRoutes from '../server/routes/goatRoutes.js';
import uploadRoutes from '../server/routes/uploadRoutes.js';
import authRoutes from '../server/routes/authRoutes.js';

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Farm API is running on Vercel Serverless' });
});

app.use('/api/auth', checkDbConnection, authRoutes);
app.use('/api/goats', checkDbConnection, goatRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
