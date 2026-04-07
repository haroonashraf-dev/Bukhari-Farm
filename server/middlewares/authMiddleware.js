import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import CustomError from '../utils/CustomError.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_change_me');

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        throw new CustomError('User not found', 401);
      }

      return next();
    } catch (error) {
      console.error(error);
      // If it's already a CustomError (like User not found), throw it directly
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Not authorized, token failed', 401);
    }
  }

  if (!token) {
    throw new CustomError('Not authorized, no token', 401);
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(`User role ${req.user.role} is not authorized to access this route`, 403);
    }
    next();
  };
};
