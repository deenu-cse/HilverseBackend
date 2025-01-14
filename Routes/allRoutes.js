const express = require("express")
const { Foodbook, GenFoodChart, PantryStaffx, PantryStaffAdd, PantryStaffDel, MealTaskAdd, MealTaskGet, MealTaskUpd, GetPatientDetail, Patientupd, DeliveryBoy, getAssignedTasks, verifyToken, getAllPatients, AllTaskGet } = require("../controllers/allController")
const router = express.Router()


router.post('/reservations', Foodbook);
router.post('/food-chart/:patientId', GenFoodChart);
router.get("/pantry-staff", PantryStaffx);
router.post("/pantry-staffadd", PantryStaffAdd);
router.delete("/pantry-staffid/:id", PantryStaffDel);
router.post("/meal-tasks", MealTaskAdd);
router.get("/get-tasks/:id", MealTaskGet);
router.get("/get-tasks", AllTaskGet);
router.put("/tasks/:id", MealTaskUpd);
router.put("/patientUpd/:patientId", Patientupd);
router.post('/getpatient/:patientId', GetPatientDetail)
router.post('/deliverylogin', DeliveryBoy)
router.get("/deliverylogin", verifyToken, getAssignedTasks);
router.get("/getpatients", getAllPatients);


module.exports = router