const mongoose = require('mongoose');

const foodChartSchema = new mongoose.Schema({
    patientId: { type: String, required: true },  // Change this to String
    morningMeal: {
        ingredients: [String],
        instructions: String,
    },
    eveningMeal: {
        ingredients: [String],
        instructions: String,
    },
    nightMeal: {
        ingredients: [String],
        instructions: String,
    },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const FoodChart = mongoose.model('FoodChart', foodChartSchema);
module.exports = FoodChart;

