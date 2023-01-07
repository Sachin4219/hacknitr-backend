import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    name:{type:String},
    speciality:{type:String},
    date:{type:Date},
    time:{type:String},
    gender:String,
    phone:String
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

export default Appointment