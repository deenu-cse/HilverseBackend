const taskSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "PantryStaff", required: true },
    patientName: { type: String, required: true },
    mealType: { type: String, enum: ["Morning", "Evening", "Night"], required: true },
    preparationStatus: { type: String, enum: ["Pending", "Prepared"], default: "Pending" },
    deliveryStatus: { type: String, enum: ["Pending", "Delivered", "Failed"], default: "Pending" },
});

module.exports = mongoose.model("Task", taskSchema);
