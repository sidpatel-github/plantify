const mongoose = require('mongoose')

// Bring in the app constants
const { DB, PORT } = require("../config");

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true
})
