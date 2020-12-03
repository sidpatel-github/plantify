const mongoose = require("mongoose");

const { SECRET } = require("../config");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
    },
    // role: {
    //   type: String,
    //   default: "user",
    //   enum: ["user", "admin", "superadmin"]
    // },
    // username: {
    //   type: String,
    //   required: true
    // },
    password: {
      type: String,
      required: true
    },
    tokens: [{
      favorites: {
        type: Number
      }
    }],
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }],
  },
  { timestamps: true }
);

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'owner'
})


// **************************************************

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: "1800s" })
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// userSchema.methods.getPublicProfile =  function () {
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema);
module.exports = User
