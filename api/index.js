import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  check_authUser,
  forgotUser
} from "../controllers/user.js";
import {
  registerDoctor,
  loginDoctor,
  check_authDoctor,
  getDoctors,
  forgotDoctor
} from "../controllers/doctor.js";

import { verifyOTP, generateOTP } from "../controllers/forgotPass.js";

import { getUserAppointments, getDoctorAppointments, postAppointment} from "../controllers/appointment.js";

// User Routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.post("/doctor/register", registerDoctor);
router.post("/doctor/login", loginDoctor);

// Appointment Routes
router.get("/user/appointments/:username", check_authUser, getUserAppointments);
router.post("/user/appointments", check_authUser, postAppointment);
router.get("/doctors", getDoctors)
router.get("/doctors/appointments", getDoctorAppointments)

// Check Auth
router.get("/user/check_login", check_authUser, (req, res) => {
  return res.status(200).json({ verified: true });
});

router.post("/user/reset", verifyOTP)
router.post("/user/forgotPassword", generateOTP)
router.post("/user/changePassword", forgotUser)

router.post("/doctor/reset", verifyOTP)
router.post("/doctor/forgotPassword", generateOTP)
router.post("/doctor/changePassword", forgotDoctor)

router.get("/doctor/check_login", check_authDoctor, (req, res) => {
  return res.status(200).json({ verified: true });
});

export default router;