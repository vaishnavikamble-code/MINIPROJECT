const Academics = require("../models/Academics");


const addAcademics = async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body);

        const { section, title, date, dept,description,drive_link } = req.body;

        if (!section || !title || !date || !dept  || !drive_link) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingNotification = await Academics.findOne({ drive_link });
        if (existingNotification) {
            return res.status(400).json({ message: "Notification  already exists" });
        }


        const newNotification = new Academics({ section, title, date, dept,description,drive_link });

        await newNotification.save();

        res.status(201).json({ message: "Notification Added successfully" });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addAcademics };