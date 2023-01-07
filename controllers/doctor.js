import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.model.js";

export const generateToken = (doctor) => {
  console.log(doctor);
  return jwt.sign({ doctor: doctor.username }, "kadabra", {
    expiresIn: "20min",
  });
};

export const registerDoctor = (req, res) => {
  const { username, password, email, speciality, registrationNo } = req.body;
  try {
    // console.log(username,password)
    // Find if username already exists or not
    Doctor.findOne({ username }, async (err, foundDoctor) => {
      if (err) throw err;
      else {
        // If doctor already exists
        if (foundDoctor) {
          // console.log('"' + username + '" is already taken');
          res
            .status(409)
            .json({ message: '"' + username + '" is already taken' });
        } else {
          // Create hash
          const hash = await bcrypt.hash(password, 10);
          // console.log("Hash created", hash)

          const newDoctor = new Doctor({ username, password: hash, email, speciality, registrationNo});
          await newDoctor.save();

          // console.log("Doctor Created: ", {
          //   username: newDoctor.username,
          //   token: generateToken(newDoctor),
          // });
          res.status(201).json({
            username: newDoctor.username,
            token: generateToken(newDoctor),
          });
        }
      }
    });
  } catch (error) {
    // console.log("Unable to register Doctor");
    res.status(409).json({ message: error.message });
  }
};

export const loginDoctor = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  try {
    const foundDoctor = await Doctor.findOne({ username });
    const hash = foundDoctor.password;
    bcrypt.compare(password, hash, (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          // console.log("Hooray")
          // console.log("Logged In: ", {
          //   username: foundDoctor.username,
          //   token: generateToken(foundDoctor),
          // });
          res.status(200).json({
            data: {
              username: foundDoctor.username,
              token: generateToken(foundDoctor),
            },
            error: false,
            message: "Login Successfull",
          });
        } else {
          // console.log("Password Does not match");
          res.status(401).json({
            data: {},
            error: true,
            message: "Invalid credentials",
          });
        }
      }
    });
  } catch (error) {
    // console.log("Unable to login Doctor");
    res.status(409).json({ message: error.message });
  }
};

export const forgotDoctor = (req, res) => {
  const { username, password } = req.body;
  try {
    // console.log(username,password)

    // Find if username already exists or not
    Doctor.findOne({ username }, async (err, foundUser) => {
      if (err) throw err;
      else {
        // If user already exists
        if (foundUser) {
          // console.log('"' + username + '" is already taken');
          const hash = await bcrypt.hash(password, 10);
          // console.log("Hash created", hash)
          foundUser.password = hash
          await foundUser.save();
          // console.log("User Created: ", {
          //   username: newUser.username,
          //   token: generateToken(newUser),
          // });
          res.status(201).json({
            username: foundUser.username,
            token: generateToken(foundUser),
          });
        } else {
          res
            .status(409)
            .json({ message: 'error user not found' });
          // Create hash
        }
      }
    });
  } catch (error) {
    // console.log("Unable to register User");
    res.status(409).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) =>{
  const docname = req.body.docname
   try{
        const appointments = await Appointment.find({"doctorname":docname})
          res.status(200).json({
            data: appointments,
            error: false,
            message: "Found Appointments",
          });
    }
    catch(error){
        res.status(409).json({ message: error.message });
    } 
} 

export const getDoctors = async (req, res) => {
    try{
        const doctors = await Doctor.find({}, {"username":1,"speciality":1,"email":1})
          res.status(200).json({
            data: doctors,
            error: false,
            message: "Found Doctors",
          });
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}


export const check_authDoctor = (req, res, next) => {
  console.log("Cheking Auth");
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, "kadabra");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};


