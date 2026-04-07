import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import { checkDbConnection } from './middlewares/dbCheck.js';
import goatRoutes from './routes/goatRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Connect to Database
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Farm API is running' });
  });
  
  app.use('/api/auth', checkDbConnection, authRoutes);
  app.use('/api/goats', checkDbConnection, goatRoutes);
  app.use('/api/upload', uploadRoutes);

  // Error Handling Middleware (API)
  app.use('/api', notFound);
  app.use('/api', errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
