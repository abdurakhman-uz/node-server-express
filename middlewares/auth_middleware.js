const jwt = require("jsonwebtoken")
const {read, write} = require("../utils/read")


module.exports = async function (req, res, next) {
    if (req.headers.token) {
        let userInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY)
        let userInfoArr = read('jwt')

        userInfoArr[0] = userInfo


        write("jwt", userInfoArr)
        next()
    } else {
        if (req.url === "/products") {
            let products = read("products")
            res.json(products)
        } else {
            return res.send({msg: 'Token required!'})
        }
    }

}
