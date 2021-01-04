const express = require('express')
const router = new express.Router()
const Cart = require('../models/Cart')
const auth = require('../middleware/auth')


router.post('/cart', auth, (req, res) => {
    const cart = new Cart({
        ...req.body,
        owner: req.user._id
    })
    console.log(cart)
    cart.save().then(() => {
        res.status(201).send(cart)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


module.exports = router