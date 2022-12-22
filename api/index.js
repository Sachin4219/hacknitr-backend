import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  check_authUser,
} from "../controllers/user.js";

import { getAppointments, postAppointment} from "../controllers/appointment.js";

// User Routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// Complaint Routes
router.get("/user/appointments/:username", check_authUser, getAppointments);
router.post("/user/appointments", check_authUser, postAppointment);

// Check Auth
router.get("/user/check_login", check_authUser, (req, res) => {
  return res.status(200).json({ verified: true });
});

export default router;