const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Order = require('../models/Order')


router.post('/order', auth, (req, res) => {
    const order = new Order({
        ...req.body,
        owner: req.user._id
    })
    console.log(order)
    order.save().then(() => {
        // throw Error('ss');      
        res.status(201).send(order)
    }).catch((error) => {
        res.status(400).send(error)
    })
})
module.exports = router