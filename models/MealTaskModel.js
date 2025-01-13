const mongoose = require("mongoose");

const MealTaskSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PantryStaff",
    required: true,
  },
  mealType: {
    type: String, // Morning, Evening, Night
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  roomName: {
    type: String, // Task description
    required: true,
  },
  patientName: {
    type: String, // Task description
    required: true,
  },
  bedNumber: {
    type: String, // Task description
    required: true,
  },
  preparationStatus: {
    type: String,
    enum: ["Pending", "Prepared"],
    default: "Pending",
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Delivered", "Failed"],
    default: "Pending",
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MealTask", MealTaskSchema);
