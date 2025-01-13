const mongoose = require("mongoose");

const MealDeliverySchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PantryStaff",
        required: true,
    },
    mealType: {
        type: String, // Morning, Evening, Night
        required: true,
    },
    deliveryStatus: {
        type: String,
        enum: ["Pending", "Delivered", "Failed"],
        default: "Pending",
    },
    deliveryDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MealDelivery", MealDeliverySchema);
