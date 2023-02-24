const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {read} = require("./utils/read")


//routes
const courseRouter = require("./routes/product_route")
const authRouter = require("./routes/auth_route")

//middleware
const authMiddleware = require("./middlewares/auth_middleware")

dotenv.config()
const {PORT} = process.env

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(authRouter)

//middleware
app.use(authMiddleware)

//register routes
app.use(courseRouter)


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
