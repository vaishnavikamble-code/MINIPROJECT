
// Importing 
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");

// Admin  Registration API

// Store predefined admin credentials (Runs once when server starts)
const storeAdminUser = async () => {
    try {
        const existingAdmin = await SuperAdmin.findOne({ email: "admin@example.com" });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("adminpassword", 10);
            const newAdmin = new SuperAdmin({
                fullName: "Admin User",
                email: "admin@example.com",
                password: hashedPassword,
            });
            await newAdmin.save();
            console.log("✅ Admin user created successfully.");
        }
    } catch (error) {
        console.error("❌ Error storing admin user:", error);
    }
};


module.exports = { storeAdminUser };     // Exporting the function for use in routes





// ✅ Admin Registration API
const registerAdmin = async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body);

        const { fullName, dept, email, password } = req.body;

        if (!fullName || !dept || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({  fullName, dept, email, password: hashedPassword });

        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("❌ Error in Admin Registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { storeAdminUser, registerAdmin }; 