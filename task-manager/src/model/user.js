const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email invalid!')
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error('Age must be positive!')
        }
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
        trim: true,
        validate(value) {
            if (value.includes('password')) throw new Error("can not containt 'password'")
        }
    }
});

module.exports = User;