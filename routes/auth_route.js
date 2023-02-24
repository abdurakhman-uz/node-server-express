const { Router } = require('express')
const AuthCtr = require("../controllers/auth_controller")


const router = Router()


router.post("/register", AuthCtr.REGISTER )
router.post("/login", AuthCtr.LOGIN )



module.exports = router