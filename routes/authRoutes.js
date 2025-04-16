const express = require("express");
const { registerStudent, loginUser } = require("../controllers/StudentController");
const { registerAdmin } = require("../controllers/SuperAdminController");
const { registerStudentProfile } = require("../controllers/student-profileController");
const {addAcademics }=require("../controllers/Academics")
const {addAnnouncement }=require("../controllers/AnnouncementController.js")
const {addNews }=require("../controllers/newsController")
const {addEvents }=require("../controllers/eventsController")







const router = express.Router();

// ✅ Define the registration & login routes
router.post("/register/student", registerStudent);
router.post("/login", loginUser);


router.post("/register/admin", registerAdmin);


router.post("/student-profile", registerStudentProfile);
// ✅ Define the Notification  routes

router.post("/academics", addAcademics);
router.post("/announcement", addAnnouncement);
router.post("/events", addEvents);
router.post("/news", addNews);


// //jwt
// router.get("/protected", verifyToken, (req, res) => {
//     res.json({ message: "Protected route accessed", user: req.user });
// });



module.exports = router;





