import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String},
    speciality:{type:String},
    registrationNo:{type:String}
})

const Doctor =  mongoose.model("Doctor", doctorSchema)
export default Doctor
