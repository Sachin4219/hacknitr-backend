import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    // username:{type:String, required:true},
    // doctorname:{type:String, required:true},
    // date:{type:Date, required:true},

    username:{type:String},
    doctorname:{type:String},
    date:{type:Date},
    time:{type:String},
    description:String,
    status:String
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

export default Appointment