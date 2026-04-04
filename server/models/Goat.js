import mongoose from 'mongoose';

const goatSchema = new mongoose.Schema(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Farm ID is required'],
      ref: 'Farm', // For future multi-farm support
    },
    tagNumber: {
      type: String,
      required: [true, 'Tag number is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    color: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'pregnant', 'sold', 'dead'],
      default: 'active',
    },
    notes: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL will be stored here
    },
    isArchived: {
      type: Boolean,
      default: false, // Soft delete flag
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure tagNumber is unique per farm
goatSchema.index({ farmId: 1, tagNumber: 1 }, { unique: true });

const Goat = mongoose.model('Goat', goatSchema);

export default Goat;
