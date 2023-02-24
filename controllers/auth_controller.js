const {PassHash, PassCheck} = require("../utils/pass")
const {uuid} = require("../utils/uuid")
const jwt = require("jsonwebtoken")
const {read, write} = require("../utils/read")

const Auth = {
    REGISTER: async (req, res) => {
        const {username, email, password} = req.body

        let users = read("users")

        let foundedUser = users.find(user => user.email === email)

        if (foundedUser) {
            return res.status(200).send({code: 1, msg: "Email already exist!"})
        }

        let hashPsw = await PassHash(password)

        console.log(hashPsw);

        users.push({id: uuid(), username, email, password: hashPsw})

        write("users", users)

        res.send({msg: 'Registration Successfull!'})


    },

    LOGIN: async (req, res) => {
        const {email, password} = req.body

        let foundedUser = read("users").find(user => user.email === email)

        if (! foundedUser) {
            return res.status(404).send({msg: "User not found!"})
        }

        let psw = await PassCheck(password, foundedUser.password)

        if (psw) {
            let token = await jwt.sign({
                id: foundedUser.id,
                email: foundedUser.email
            }, process.env.SECRET_KEY, {expiresIn: process.env.JWT_TIME})

            return res.send({msg: "Success!", token})

        }

        res.send("Ok")
    }
}

module.exports = Auth
