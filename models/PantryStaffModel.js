const mongoose = require("mongoose");

const PantryStaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("PantryStaff", PantryStaffSchema);
