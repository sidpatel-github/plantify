const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
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

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'ordermapping'
})

const Plant = mongoose.model('Order', taskSchema)

module.exports = Plant