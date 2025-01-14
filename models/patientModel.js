const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    diseases: {
      type: [String],
      default: [],
    },
    allergies: {
      type: [String],
      default: [],
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    bedNumber: {
      type: String,
      required: true,
      trim: true,
    },
    floorNumber: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format",
      ],
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    patientId: {
      userId: { type: String, required: true, unique: true },
    },
  },
  { timestamps: true }
);


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
