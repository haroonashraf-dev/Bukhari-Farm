import asyncHandler from '../utils/asyncHandler.js';
import * as goatService from '../services/goatService.js';

// @desc    Create a new goat
// @route   POST /api/goats
// @access  Private
export const createGoat = asyncHandler(async (req, res) => {
  // Mocking farmId for now since we don't have authentication middleware yet
  // In a real app, this would come from req.user.farmId
  const farmId = req.body.farmId || '60d5ec49f1b2c8b1f8e4e1a1'; 
  const goatData = { ...req.body, farmId };

  const goat = await goatService.createGoat(goatData);
  
  res.status(201).json({
    success: true,
    data: goat,
  });
});

// @desc    Get all goats
// @route   GET /api/goats
// @access  Private
export const getGoats = asyncHandler(async (req, res) => {
  const goats = await goatService.getGoats(req.query);
  
  res.status(200).json({
    success: true,
    count: goats.length,
    data: goats,
  });
});

// @desc    Get single goat
// @route   GET /api/goats/:id
// @access  Private
export const getGoatById = asyncHandler(async (req, res) => {
  const goat = await goatService.getGoatById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: goat,
  });
});

// @desc    Update goat
// @route   PUT /api/goats/:id
// @access  Private
export const updateGoat = asyncHandler(async (req, res) => {
  const goat = await goatService.updateGoat(req.params.id, req.body);
  
  res.status(200).json({
    success: true,
    data: goat,
  });
});

// @desc    Archive (soft delete) goat
// @route   DELETE /api/goats/:id
// @access  Private
export const archiveGoat = asyncHandler(async (req, res) => {
  await goatService.archiveGoat(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Goat archived successfully',
  });
});
