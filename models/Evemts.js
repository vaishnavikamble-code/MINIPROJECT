
const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    section: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true, unique: true },
    dept: { type: String, required: true },
    description: { type: String,  },
    drive_link: { type: String, required: true },

    
});

module.exports = mongoose.model("Events", eventsSchema);