const profiles = require("../models/student-profile");

const registerStudentProfile = async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body);

        const { fullName, studentID, dateOfBirth, gender, department, year, admissionProcess} = req.body;

        if (!fullName || !studentID || !dateOfBirth || !gender || !department || !year || !admissionProcess) {
            return res.status(400).json({ message: "All fields are required" });
        }

        

        const newNotification = new profiles({ fullName, studentID, dateOfBirth, gender, department, year, admissionProcess });

        await newNotification.save();

        res.status(201).json({ message: "Profile Updated Successfully" });
    } catch (error) {
        console.error("❌ Error in Student Registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { registerStudentProfile };


