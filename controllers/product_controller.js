const {uuid} = require("../utils/uuid")
const jwt = require("jsonwebtoken")
const {read, write} = require("../utils/read")
let userData = read("jwt")
let {id} = userData[0]

let Product = {

    GET: (req, res) => {

        let products = read("products").filter(user => user.user_id === id)
        if(products){
            res.status(200).json({msg: true, data: products})
            console.log(products);
        } else {
            res.status(200).json({msg: false, data: products})
            console.log(products);
        }
    },

    CREATE: async (req, res) => {
        try {
            let products = read("products")

            products.push({
                id: uuid(),
                user_id: id,
                ...req.body
            })

            write("products", products)

            res.status(201).send({msg: "Product Created!"})

        } catch (error) {
            res.send(error.message)

        }

    },

    UPDATE: (req, res) => {
        try {
            let products = read("products").filter(user => user.user_id === id)

            const {title, price, author} = req.body

            products.forEach((product) => {
                if (product.id === req.params.id) {
                    product.title = title ? title : product.title
                    product.price = price ? price : product.price
                    product.author = author ? author : product.author
                }
            })

            write("products", products)

            res.status(200).send({msg: "Product Updated!"})
        } catch (error) {}
    },

    DELETE: (req, res) => {
        let products = read("products")

        const {title, price, author} = req.body

        products.forEach((product, idx) => {
            if (product.id === req.params.id) {
                products.splice(idx, 1)
            }
        })

        write("products", products)

        res.status(200).send({msg: "Product Deleted!"})
    }
}

module.exports = Product
