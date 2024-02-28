const { Router } = require("express");
const router = Router();
const { signUp, Login } = require("../controllers/authController");

router.post("/signup", signUp)
router.post("/login", Login)

module.exports = router;
