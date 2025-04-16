const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");

// ✅ Student Registration API
const registerStudent = async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body);

        const { fullName, dept, email, password } = req.body;

        if (!fullName || !dept || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({ fullName, dept, email, password: hashedPassword });

        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error("❌ Error in Student Registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerStudent };

const loginUser = async (req, res) => {
    try {
        console.log("📩 Login attempt received:", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = null;
        let role = null;

        // ✅ Check SuperAdmin first
         user = await SuperAdmin.findOne({ email });
        if (user) role = "superAdmin";

        // ✅ Check Admin next
        if (!user) {
            user = await Admin.findOne({ email });
            if (user) role = "admin";
        }

        // ✅ Check Student last
        if (!user) {
            user = await Student.findOne({ email });
            if (user) role = "student";
        }

        if (!user) {
            return res.status(400).json({ message: "User not found, please register" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await jwt.sign({ _id: user._id }, "dharmavirlondhe", {
                expiresIn: "2d",
              });
              console.log(token)
        
              res.cookie("token", token);        
        }else {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log(`✅ ${role} login successful`);

         // Generate JWT Token
    //    const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        // ✅ Ensure the response is sent only once
        return res.status(200).json({ message: "Login successful", role });

        // return res.status(200).json({ message: "Login successful", role, token });

    } catch (error) {
        console.error("❌ Error in Login:", error);

        // ✅ Prevent multiple responses if an error occurs after a response is sent
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error" });
        }
    }
};


module.exports = { registerStudent, loginUser };




