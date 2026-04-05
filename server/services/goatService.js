import Goat from '../models/Goat.js';
import CustomError from '../utils/CustomError.js';

/**
 * Create a new goat
 */
export const createGoat = async (goatData) => {
  // Check if tag number already exists for this specific farm
  const existingGoat = await Goat.findOne({
    farmId: goatData.farmId,
    tagNumber: goatData.tagNumber,
  });

  if (existingGoat) {
    throw new CustomError(`Goat with tag number ${goatData.tagNumber} already exists in this farm`, 400);
  }

  const goat = await Goat.create(goatData);
  return goat;
};

/**
 * Get all goats with search and filter capabilities
 */
export const getGoats = async (query) => {
  const { farmId, search, status } = query;
  
  // Base filter: only get non-archived goats
  const filter = { isArchived: false };

  if (farmId) filter.farmId = farmId;
  if (status) filter.status = status;

  // Search by name or tag number (case-insensitive)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { tagNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const goats = await Goat.find(filter).sort({ createdAt: -1 });
  return goats;
};

/**
 * Get a single goat by ID
 */
export const getGoatById = async (id) => {
  const goat = await Goat.findOne({ _id: id, isArchived: false });
  
  if (!goat) {
    throw new CustomError('Goat not found', 404);
  }
  
  return goat;
};

/**
 * Update a goat's details
 */
export const updateGoat = async (id, updateData) => {
  const goat = await Goat.findOne({ _id: id, isArchived: false });
  
  if (!goat) {
    throw new CustomError('Goat not found', 404);
  }

  // If tag number is being updated, ensure it doesn't conflict with another goat in the same farm
  if (updateData.tagNumber && updateData.tagNumber !== goat.tagNumber) {
    const existing = await Goat.findOne({
      farmId: goat.farmId,
      tagNumber: updateData.tagNumber,
    });
    
    if (existing) {
      throw new CustomError('Tag number already in use by another goat in this farm', 400);
    }
  }

  const updatedGoat = await Goat.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });

  return updatedGoat;
};

/**
 * Hard delete a goat
 */
export const deleteGoat = async (id) => {
  const goat = await Goat.findByIdAndDelete(id);

  if (!goat) {
    throw new CustomError('Goat not found', 404);
  }

  return goat;
};
