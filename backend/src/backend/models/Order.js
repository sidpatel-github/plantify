const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

// userSchema.virtual('orders', {
//     ref: 'Order',
//     localField: '_id',
//     foreignField: 'ordermapping'
// })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order