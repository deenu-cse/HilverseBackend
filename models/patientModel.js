const mongoose = require('mongoose');

// Function to generate a 4-digit random ID
function generateId() {
  const characters = "0123456789";
  let patientId = "";
  for (let i = 0; i < 4; i++) {
    patientId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return patientId;
}

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
      type: String,
      unique: true, 
      required: true,
    },
  },
  { timestamps: true } 
);

// Middleware to generate a unique `patientId` before saving
patientSchema.pre("save", function (next) {
  if (!this.patientId) {
    const namePart = this.name.slice(0, 8).toUpperCase();
    this.patientId = namePart + generateId();
  }
  next();
});


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
