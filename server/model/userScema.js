const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const secretKey = "abcdefghijklmnopqrstuvwxyzabcdef";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email address")
            }
        }
    },
    uname: {
        type: String,
        required: true,
        trim: true
    },
    pass: {
        type: String,
        required: true,
        trim: true
    },
    pimage: {
        type: String,
        required: false
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

// code for hashing user password

userSchema.pre("save", async function (next) {
    if (this.isModified("pass")) {
        this.pass = await bcrypt.hash(this.pass, 4);
    }
    next();
})

// code for genrating auth token 

userSchema.methods.genAuthtoken = async function () {
    try {
        const token_one = jwt.sign({ _id: this._id }, secretKey);
        this.tokens = this.tokens.concat({ token: token_one })
        await this.save();
        return token_one;
    } catch (error) {
        console.log(error);
    }
}

const register = new mongoose.model("twitter_users", userSchema)

module.exports = register;