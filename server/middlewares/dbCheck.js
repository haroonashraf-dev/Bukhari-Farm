import mongoose from 'mongoose';

export const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection is not established. Please configure your MONGO_URI in the AI Studio Secrets panel.',
    });
  }
  next();
};
