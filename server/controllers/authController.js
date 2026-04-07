import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import CustomError from '../utils/CustomError.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_change_me', {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new CustomError('Please add all fields', 400);
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new CustomError('User already exists', 400);
  }

  // Check if this is the first user, if so make them an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const userRole = isFirstAccount ? 'admin' : (role || 'staff');

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: userRole,
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    throw new CustomError('Invalid user data', 400);
  }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError('Please provide an email and password', 400);
  }

  // Check for user email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new CustomError('Invalid credentials', 401);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new CustomError('Invalid credentials', 401);
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Get all users (Staff Management)
// @route   GET /api/auth/users
// @access  Private/Admin/Manager
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc    Update user role
// @route   PUT /api/auth/users/:id/role
// @access  Private/Admin/Manager
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // Prevent admin from demoting themselves if they are the only admin
  if (user.role === 'admin' && req.body.role !== 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount <= 1) {
      throw new CustomError('Cannot demote the only admin', 400);
    }
  }

  // If current user is manager, they cannot modify an admin
  if (req.user.role === 'manager' && user.role === 'admin') {
    throw new CustomError('Managers cannot modify admin roles', 403);
  }

  // Managers cannot make someone an admin
  if (req.user.role === 'manager' && req.body.role === 'admin') {
    throw new CustomError('Managers cannot assign admin roles', 403);
  }

  user.role = req.body.role || user.role;
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
});

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin/Manager
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // Prevent admin from deleting themselves
  if (user._id.toString() === req.user.id) {
    throw new CustomError('You cannot delete your own account', 400);
  }

  // If current user is manager, they cannot delete an admin
  if (req.user.role === 'manager' && user.role === 'admin') {
    throw new CustomError('Managers cannot delete admin accounts', 403);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
