const {Router} = require("express")
const { UpdateUserInfo } = require("../controllers/userController")
const { verifyToken } = require("../utils/VerifyUser")
// const { UpdateUserInfo } = require("../controllers/authController")
const router = Router()


router.put("/update/:id",verifyToken, UpdateUserInfo)



module.exports = router