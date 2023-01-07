import Appointment from "../models/appointment.model.js";
import { check_authUser } from "./user.js";
import User from "../models/user.model.js";

export const getUserAppointments = (req, res) => {
  try {
    const username = req.params.username
    console.log("[Request]",username)
    Appointment.find({name:username}, (err, allappointments) => {
      if (err) throw err;
      else {
        console.log(allappointments)
        res.status(200).json({ appointments: allappointments });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

export const getDoctorAppointments = (req, res) => {
  try {
    Appointment.find({}, (err, allappointments) => {
      if (err) throw err;
      else {
        console.log(allappointments)
        res.status(200).json({ appointments: allappointments });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

//user appointment Post
export const postAppointment = async (req, res) => {
    console.log("this is appointment post route")
  try {
    const appointment = {
      name: req.body.name,
      speciality:req.body.speciality,
      date:req.body.date,
      gender:req.body.gender,
      phone:req.body.phone
    };

    const newappointment = new Appointment(appointment);
    await newappointment.save();
    res.status(201).json({ appointment: newappointment });
    console.log(appointment)

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};
