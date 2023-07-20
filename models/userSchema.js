const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    phoneNo: {
        type: Number
    },
    videoPosts: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            requierd: true
        }
    }],
    imagePosts: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            requierd: true
        }
    }],
    avatar: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
})
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function(currPassword) {
    return await bcrypt.compare(currPassword, this.password)
}
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}
module.exports = new mongoose.model("User", userSchema)