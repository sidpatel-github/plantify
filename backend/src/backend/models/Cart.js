const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    items: [{
        plantId: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
    }],
    completed: {
        type: Boolean,
        default: false
    },
    ordermapping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Cart = mongoose.model('Cart', taskSchema)

module.exports = Cart