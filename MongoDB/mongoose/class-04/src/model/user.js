const mongoose = require('mongoose');
const { Schema } = mongoose
const validator = require('validator')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        // lowercase: true
    },

    lastName: {
        type: String,
        minLength: 3,
        maxLength: 30,
    },

    age: {
        type: Number,
        // required: true,
        min: 10,
        max: 40
    },

    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },

    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Please use a strong password !')
            }
        }
    },

    gender: {
        type: String,
        // required: true,

        validate(value){
           if(!["male", "female", "other"].includes(value)){
            throw new Error("Gender data is not valid");
           } 
        }
    }  
},
    {
        collection: 'e-commerce',
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};