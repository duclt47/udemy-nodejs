const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager-api');
const validator = require('validator');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'B hoc mongoDB',
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) throw new Error('Email invalid!')
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if (value < 0) throw new Error('Age must be positive!')
//         }
//     },
//     password: {
//         type: String,
//         minLength: 6,
//         required: true,
//         trim: true,
//         validate(value) {
//             if (value.includes('password')) throw new Error("can not containt 'password'")
//         }
//     }
// });

// const user = new User({
//     name: 'nguyen van c',
//     email: 'd@email.com',
//     age: 20,
//     password: '123456'
// })

task.save().then(() => console.log("saved task:", task))
    .catch((err) => console.error(err))

// user.save().then(() => console.log("added new user:", user))
//     .catch((err) => console.error(err))

