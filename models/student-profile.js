
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    studentID: { type: String, required: true },
    dateOfBirth: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    admissionProcess: { type: String, required: true }

});

module.exports = mongoose.model("profile", studentSchema);