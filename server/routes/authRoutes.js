const { Router } = require("express");
const router = Router();
const { signUp, Login, google } = require("../controllers/authController");

router.post("/signup", signUp)
router.post("/login", Login)
router.post("/google", google)
// router.post("/facebook", facebook )

module.exports = router;
