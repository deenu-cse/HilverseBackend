require("dotenv").config()
const generateMealPlan = require("../middleware/FoodChartMiddleware");
const FoodChart = require("../models/FoodChartModel");
const Patient = require("../models/patientModel");
const PantryStaff = require('../models/PantryStaffModel')
const MealTask = require('../models/MealTaskModel')
const jwt = require('jsonwebtoken')

const generateId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let userId = "";
    for (let i = 0; i < 8; i++) {
        userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return userId;
};

const Foodbook = async (req, res) => {
    console.log(req.body);
    try {
        console.log("Code is here...");

        const {
            name,
            diseases,
            allergies,
            roomNumber,
            bedNumber,
            floorNumber,
            age,
            gender,
            contactInfo,
            emergencyContact,
        } = req.body;

        if (
            !name ||
            !roomNumber ||
            !bedNumber ||
            !floorNumber ||
            !age ||
            !gender ||
            !contactInfo ||
            !emergencyContact
        ) {
            return res.status(400).json({ message: 'All required fields must be filled!' });
        }

        const existingPatient = await Patient.findOne({ contactInfo });

        if (existingPatient) {
            return res.status(400).json({
                message: 'A patient with this contact information already exists.',
                data: existingPatient,
            });
        }

        const newPatient = new Patient({
            name,
            diseases,
            allergies,
            roomNumber,
            bedNumber,
            floorNumber,
            age,
            gender,
            contactInfo,
            emergencyContact,
            patientId: { userId: generateId() },
        });        

        const savedPatient = await newPatient.save();

        res.status(201).json({
            message: 'Patient data successfully saved!',
            data: savedPatient,
        });
    } catch (error) {
        console.error('Error saving patient data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const GenFoodChart = async (req, res) => {
    const { patientId } = req.params;
    // console.log("code in foodchart...");

    try {
        const patient = await Patient.findOne({ "patientId.userId": patientId });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        const diseases = Array.isArray(patient.diseases)
            ? patient.diseases
            : patient.diseases.split(',').map(disease => disease.trim());

        const processedDiseases = diseases.flatMap(disease => disease.split(',').map(d => d.trim()));
        // console.log("Processed Diseases:", processedDiseases);

        const allergies = Array.isArray(patient.allergies)
            ? patient.allergies
            : patient.allergies.split(',').map(allergy => allergy.trim());

        // console.log("Allergies:", allergies);

        const mealPlan = generateMealPlan(processedDiseases, allergies);

        const newFoodChart = new FoodChart({
            patientId,
            morningMeal: mealPlan.morningMeal,
            eveningMeal: mealPlan.eveningMeal,
            nightMeal: mealPlan.nightMeal
        });

        const savedFoodChart = await newFoodChart.save();

        res.status(201).json({
            message: 'Food chart successfully generated!',
            data: savedFoodChart
        });
    } catch (error) {
        console.error('Error generating food chart:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const GetPatientDetail = async (req, res) => {
    const { patientId } = req.params;
    console.log("Code here....")
    try {
        const patient = await Patient.findOne({ "patientId.userId": patientId });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found!' });
        }
        res.status(201).json({ message: 'Patient data retrieved!', patient });

    } catch (error) {
        console.error('Error get patient data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const Patientupd = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patientData = await Patient.findOneAndUpdate(
            { "patientId.userId": patientId },
            req.body,
            { new: true }
        );

        if (!patientData) {
            return res.status(404).json({ message: 'Patient not found!' });
        }

        res.json(patientData);
    } catch (error) {
        console.error('Error updating patient data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Failed to authenticate token." });
        req.staffId = decoded.staffId;
        next();
    });
};

// Login route
const DeliveryBoy = async (req, res) => {
    const { email } = req.body;
    console.log("Code in delivery boy...")
    try {
        const staff = await PantryStaff.findOne({ email });
        if (!staff) return res.status(404).json({ message: "Staff not found." });

        const tasks = await MealTask.find({ staffId: staff._id });
        const token = jwt.sign({ staffId: staff._id }, process.env.JWT_SECRET, { expiresIn: "5d" });

        res.json({ token, assignedTasks: tasks });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

// Fetch tasks for logged-in delivery boy
const getAssignedTasks = async (req, res) => {
    try {
        const tasks = await MealTask.find({ staffId: req.staffId });
        res.json({ assignedTasks: tasks });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const data = await Patient.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

const PantryStaffx = async (req, res) => {
    try {
        console.log("code here...")
        const staff = await PantryStaff.find();
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const PantryStaffAdd = async (req, res) => {
    try {
        const newStaff = new PantryStaff(req.body);
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const PantryStaffDel = async (req, res) => {
    try {
        const { id } = req.params;
        await PantryStaff.findByIdAndDelete(id);
        res.json({ message: "Staff deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const MealTaskAdd = async (req, res) => {
    try {
        console.log(req.body)
        const newTask = new MealTask(req.body);
        await newTask.save();
        console.log("newTask here", newTask)
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const MealTaskGet = async (req, res) => {
    try {
        const tasks = await MealTask.find().populate("staffId", "name");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const MealTaskUpd = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        console.log(req.params)
        const updates = req.body;
        const updatedTask = await MealTask.findByIdAndUpdate(id, updates, { new: true });
        console.log("newData", updatedTask)
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { Foodbook, GenFoodChart, PantryStaffx, PantryStaffAdd, PantryStaffDel, MealTaskAdd, MealTaskGet, MealTaskUpd, GetPatientDetail, Patientupd, DeliveryBoy, verifyToken, getAssignedTasks, getAllPatients };
