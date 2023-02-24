const { Router } = require("express")
const CourseCtr = require("../controllers/product_controller")
const authMid = require("../middlewares/auth_middleware")

let router = Router()


router.get("/products", CourseCtr.GET )
router.post("/products", CourseCtr.CREATE)
router.put("/product/:id", CourseCtr.UPDATE)
router.delete("/product/:id", CourseCtr.DELETE)


module.exports = router